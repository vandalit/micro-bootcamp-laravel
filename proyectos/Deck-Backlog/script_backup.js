class IdeaDeckManager {
    constructor() {
        this.decks = [];
        this.allCategories = new Set();
        this.allHashtags = new Set();
        this.currentSearchQuery = '';
        this.currentEditingCard = null;
        this.currentDetailCard = null;
        this.currentLightboxCard = null;
        this.currentLightboxIndex = -1;
        this.vaultData = null;
        this.containerDropHandlerAdded = false;
        this.isSimplifiedView = false;
        this.storageMode = 'web'; // 'web' (localStorage) or 'local' (JSON)
        this.isGitHubPages = false;
        
        this.init();
    }

    async init() {
        this.detectEnvironment();
        await this.loadData();
        this.bindEvents();
        this.render();
        this.updateFilters();
    }

    // Detect if running locally or on GitHub Pages
    detectEnvironment() {
        this.isLocal = window.location.protocol === 'file:' || 
                      window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
        
        this.isGitHubPages = window.location.hostname === 'vandalit.github.io';
        
        // Set storage mode based on environment
        if (this.isGitHubPages) {
            this.storageMode = 'web';
        } else if (this.isLocal) {
            this.storageMode = 'local';
        } else {
            this.storageMode = 'web';
        }
        
        // Update UI based on environment
        this.updateStorageUI();
        
        // Show/hide local-only features
        const localBtn = document.getElementById('localBtn');
        if (localBtn) {
            localBtn.style.display = this.isLocal ? 'flex' : 'none';
        }
    }
    
    updateStorageUI() {
        const storageChip = document.getElementById('storageChip');
        
        if (storageChip) {
            if (this.isGitHubPages) {
                storageChip.textContent = 'Web';
                storageChip.className = 'storage-chip web';
            } else if (this.isLocal) {
                storageChip.textContent = 'Local';
                storageChip.className = 'storage-chip local';
            }
        }
    }

    // Event Binding
    bindEvents() {
        // Header actions
        const createDeckBtn = document.getElementById('createDeckBtn');
        const dataMenuBtn = document.getElementById('dataMenuBtn');
        
        if (createDeckBtn) createDeckBtn.addEventListener('click', () => this.showDeckModal());
        if (dataMenuBtn) dataMenuBtn.addEventListener('click', () => this.toggleDataMenu());
        
        // Data menu actions
        const exportBtn = document.getElementById('exportBtn');
        const importBtn = document.getElementById('importBtn');
        const backupBtn = document.getElementById('backupBtn');
        const clearDataBtn = document.getElementById('clearDataBtn');
        
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportToCSV());
        if (importBtn) importBtn.addEventListener('click', () => this.importFromCSV());
        if (backupBtn) backupBtn.addEventListener('click', () => this.showBackupModal());
        if (clearDataBtn) clearDataBtn.addEventListener('click', () => this.clearData());
        
        // Local storage button (only visible in local environment)
        const localBtn = document.getElementById('localBtn');
        if (localBtn) {
            localBtn.addEventListener('click', () => this.generateLocalJSON());
        }
        
        // Modal events
        const closeDeckModal = document.getElementById('closeDeckModal');
        const cancelDeckBtn = document.getElementById('cancelDeckBtn');
        const closeCardModal = document.getElementById('closeCardModal');
        const cancelCardBtn = document.getElementById('cancelCardBtn');
        
        if (closeDeckModal) closeDeckModal.addEventListener('click', () => this.hideDeckModal());
        if (cancelDeckBtn) cancelDeckBtn.addEventListener('click', () => this.hideDeckModal());
        if (closeCardModal) closeCardModal.addEventListener('click', () => this.hideCardModal());
        if (cancelCardBtn) cancelCardBtn.addEventListener('click', () => this.hideCardModal());
        
        // Form submissions
        const deckForm = document.getElementById('deckForm');
        const cardForm = document.getElementById('cardForm');
        
        if (deckForm) deckForm.addEventListener('submit', (e) => this.handleDeckSubmit(e));
        if (cardForm) cardForm.addEventListener('submit', (e) => this.handleCardSubmit(e));
        
        // Search and filters
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // File input for import
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.addEventListener('change', (e) => this.handleFileImport(e));
        
        // Detail modal events
        const closeDetailModal = document.getElementById('closeDetailModal');
        if (closeDetailModal) closeDetailModal.addEventListener('click', () => this.hideDetailModal());
        
        // Backup modal events
        const closeBackupModal = document.getElementById('closeBackupModal');
        const confirmBackupBtn = document.getElementById('confirmBackupBtn');
        
        if (closeBackupModal) closeBackupModal.addEventListener('click', () => this.hideBackupModal());
        if (confirmBackupBtn) confirmBackupBtn.addEventListener('click', () => this.hideBackupModal());
        
        // Detail modal button events - using class selector like deck buttons
        document.addEventListener('click', (e) => {
            // Check for detail action buttons by class
            if (e.target.classList.contains('detail-action-btn') || e.target.closest('.detail-action-btn')) {
                const button = e.target.classList.contains('detail-action-btn') ? e.target : e.target.closest('.detail-action-btn');
                e.preventDefault();
                e.stopPropagation();
                
                if (button.id === 'editDetailBtn') {
                    this.editFromDetail();
                } else if (button.id === 'deleteDetailBtn') {
                    this.deleteFromDetail();
                }
            }
        });
        
        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAllModals();
            }
        });
        
        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeDataMenu();
            }
        });
        
        // Parallax effect on scroll
        this.setupParallaxEffect();
    }

    // Data Management
    async loadData() {
        console.log('Loading data: vault.json first, then localStorage merge...');
        
        // Step 1: Always load vault.json as base data
        let vaultData = null;
        try {
            const response = await fetch('./vault.json');
            if (response.ok) {
                vaultData = await response.json();
                this.vaultData = JSON.parse(JSON.stringify(vaultData)); // Deep copy for comparison
                console.log('Vault data loaded:', vaultData);
                // Mark all vault data with source
                this.markDataSource(vaultData.decks, 'vault');
            }
        } catch (error) {
            console.log('No vault.json found or error loading it:', error);
        }
        
        // Step 2: Load localStorage modifications
        let localStorageData = null;
        try {
            const savedData = localStorage.getItem('cardsBacklog');
            if (savedData) {
                localStorageData = JSON.parse(savedData);
                console.log('localStorage data loaded:', localStorageData);
                // Mark all localStorage data with source
                this.markDataSource(localStorageData.decks, 'localStorage');
            }
        } catch (error) {
            console.error('Error loading localStorage data:', error);
        }
        
        // Step 3: Merge data (vault as base, localStorage as modifications/additions)
        this.decks = this.mergeVaultAndLocalStorage(vaultData?.decks || [], localStorageData?.decks || []);
        
        // Step 4: If no data at all, create default
        if (this.decks.length === 0) {
            this.createDefaultDeck();
        }
        
        this.updateCategoriesAndHashtags();
        console.log('Final merged data:', this.decks);
    }

    saveData() {
        // Always save to localStorage (single storage system)
        const data = {
            decks: this.decks,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem('cardsBacklog', JSON.stringify(data));
        console.log('Data saved to localStorage');
    }
    
    // Mark data with source origin for visual indicators
    markDataSource(decks, source) {
        if (!decks) return;
        decks.forEach(deck => {
            deck._source = source;
            if (deck.cards) {
                deck.cards.forEach(card => {
                    card._source = source;
                });
            }
        });
    }

    // Merge vault and localStorage data
    mergeVaultAndLocalStorage(vaultDecks, localStorageDecks) {
        const mergedDecks = [...vaultDecks]; // Start with vault as base
        
        localStorageDecks.forEach(localDeck => {
            const existingDeckIndex = mergedDecks.findIndex(d => d.id === localDeck.id);
            
            if (existingDeckIndex >= 0) {
                // Deck exists in vault, merge cards
                const existingDeck = mergedDecks[existingDeckIndex];
                
                localDeck.cards?.forEach(localCard => {
                    const existingCardIndex = existingDeck.cards?.findIndex(c => c.id === localCard.id) || -1;
                    
                    if (existingCardIndex >= 0) {
                        // Card exists in vault, replace with localStorage version (modified)
                        existingDeck.cards[existingCardIndex] = localCard;
                    } else {
                        // New card from localStorage
                        if (!existingDeck.cards) existingDeck.cards = [];
                        existingDeck.cards.push(localCard);
                    }
                });
                
                // Update deck properties if modified in localStorage
                if (localDeck._source === 'localStorage') {
                    mergedDecks[existingDeckIndex] = { ...existingDeck, ...localDeck, cards: existingDeck.cards };
                }
            } else {
                // New deck from localStorage
                mergedDecks.push(localDeck);
            }
        });
        
        return mergedDecks;
    }

    // Create backup vault.json
    createBackup() {
        const data = {
            decks: this.decks,
            lastModified: new Date().toISOString(),
            version: "1.0.0"
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vault.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show backup modal instead of alert
        this.showBackupModal();
    }


    createDefaultDeck() {
        const defaultDeck = {
            id: this.generateId(),
            name: 'Ideas Generales',
            description: 'Deck principal para ideas y proyectos',
            cards: [],
            createdAt: new Date().toISOString()
        };
        this.decks.push(defaultDeck);
        this.saveData();
    }

    updateCategoriesAndHashtags() {
        this.allCategories.clear();
        this.allHashtags.clear();
        
        this.decks.forEach(deck => {
            deck.cards.forEach(card => {
                if (card.category) {
                    this.allCategories.add(card.category.toLowerCase());
                }
                if (card.hashtags) {
                    card.hashtags.forEach(tag => {
                        // Handle both string and array formats
                        const cleanTag = typeof tag === 'string' 
                            ? (tag.startsWith('#') ? tag.substring(1) : tag)
                            : tag;
                        this.allHashtags.add(cleanTag.toLowerCase());
                    });
                }
            });
        });
    }

    // Utility Functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    parseHashtags(hashtagString) {
        if (!hashtagString) return [];
        // Handle both string input and array input
        if (Array.isArray(hashtagString)) {
            return hashtagString.map(tag => {
                if (typeof tag === 'string') {
                    return tag.startsWith('#') ? tag.substring(1).toLowerCase() : tag.toLowerCase();
                }
                return tag;
            });
        }
        return hashtagString.split(/\s+/)
            .filter(tag => tag.startsWith('#'))
            .map(tag => tag.substring(1).toLowerCase());
    }

    parseImages(imageString) {
        if (!imageString) return [];
        return imageString.split(',')
            .map(url => url.trim())
            .filter(url => url.length > 0);
    }

    // Deck Management
    showDeckModal(deck = null) {
        this.currentEditingDeck = deck;
        const modal = document.getElementById('deckModal');
        const title = document.getElementById('deckModalTitle');
        const form = document.getElementById('deckForm');
        
        if (deck) {
            title.textContent = 'Editar Deck';
            document.getElementById('deckName').value = deck.name;
            document.getElementById('deckDescription').value = deck.description || '';
        } else {
            title.textContent = 'Crear Nuevo Deck';
            form.reset();
        }
        
        modal.classList.add('active');
    }

    hideDeckModal() {
        document.getElementById('deckModal').classList.remove('active');
        this.currentEditingDeck = null;
    }

    handleDeckSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('deckName').value.trim();
        const description = document.getElementById('deckDescription').value.trim();
        
        if (!name) return;
        
        if (this.currentEditingDeck) {
            // Edit existing deck
            this.currentEditingDeck.name = name;
            this.currentEditingDeck.description = description;
        } else {
            // Create new deck
            const newDeck = {
                id: this.generateId(),
                name,
                description,
                cards: [],
                createdAt: new Date().toISOString()
            };
            this.decks.push(newDeck);
        }
        
        this.saveData();
        this.render();
        this.hideDeckModal();
    }

    deleteDeck(deckId) {
        if (confirm('¿Estás seguro de que quieres eliminar este deck y todas sus cards?')) {
            this.decks = this.decks.filter(deck => deck.id !== deckId);
            this.saveData();
            this.render();
            this.updateFilters();
        }
    }

    // Card Management
    showCardModal(deckId, card = null) {
        this.currentEditingCard = { deckId, card };
        const modal = document.getElementById('cardModal');
        const title = document.getElementById('cardModalTitle');
        const form = document.getElementById('cardForm');
        
        if (card) {
            title.textContent = 'Editar Card';
            document.getElementById('cardTitle').value = card.title;
            document.getElementById('cardCategory').value = card.category || '';
            document.getElementById('cardDescription').value = card.description || '';
            document.getElementById('cardNotes').value = card.notes || '';
            document.getElementById('cardHashtags').value = card.hashtags ? card.hashtags.map(tag => `#${tag}`).join(' ') : '';
            document.getElementById('cardCoverImage').value = card.coverImage || '';
            document.getElementById('cardGalleryImages').value = card.galleryImages ? card.galleryImages.join(', ') : '';
        } else {
            title.textContent = 'Crear Nueva Card';
            form.reset();
        }
        
        modal.classList.add('active');
    }

    hideCardModal() {
        document.getElementById('cardModal').classList.remove('active');
        this.currentEditingCard = null;
    }

    handleCardSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('cardTitle').value.trim();
        const category = document.getElementById('cardCategory').value.trim();
        const description = document.getElementById('cardDescription').value.trim();
        const notes = document.getElementById('cardNotes').value.trim();
        const hashtagString = document.getElementById('cardHashtags').value.trim();
        const coverImage = document.getElementById('cardCoverImage').value.trim();
        const galleryImagesString = document.getElementById('cardGalleryImages').value.trim();
        
        if (!title) return;
        
        const hashtags = this.parseHashtags(hashtagString);
        const galleryImages = this.parseImages(galleryImagesString);
        
        const deck = this.decks.find(d => d.id === this.currentEditingCard.deckId);
        if (!deck) return;
        
        if (this.currentEditingCard.card) {
            // Edit existing card
            const card = this.currentEditingCard.card;
            card.title = title;
            card.category = category;
            card.description = description;
            card.notes = notes;
            card.hashtags = hashtags;
            card.coverImage = coverImage;
            card.galleryImages = galleryImages;
            card.updatedAt = new Date().toISOString();
        } else {
            // Create new card
            const newCard = {
                id: this.generateId(),
                title,
                category,
                description,
                notes,
                hashtags,
                coverImage,
                galleryImages,
                createdAt: new Date().toISOString()
            };
            deck.cards.push(newCard);
        }
        
        this.saveData();
        this.updateCategoriesAndHashtags();
        this.render();
        this.updateFilters();
        this.hideCardModal();
    }

    deleteCard(deckId, cardId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta card?')) {
            const deck = this.decks.find(d => d.id === deckId);
            if (deck) {
                deck.cards = deck.cards.filter(card => card.id !== cardId);
                this.saveData();
                this.render();
                this.updateFilters();
            }
        }
    }

    moveCard(cardId, fromDeckId, toDeckId) {
        console.log('Moving card:', cardId, 'from', fromDeckId, 'to', toDeckId);
        
        const fromDeck = this.decks.find(d => d.id === fromDeckId);
        const toDeck = this.decks.find(d => d.id === toDeckId);
        
        console.log('From deck:', fromDeck?.name, 'To deck:', toDeck?.name);
        
        if (fromDeck && toDeck && fromDeckId !== toDeckId) {
            const cardIndex = fromDeck.cards.findIndex(c => c.id === cardId);
            console.log('Card index in source deck:', cardIndex);
            
            if (cardIndex !== -1) {
                const card = fromDeck.cards.splice(cardIndex, 1)[0];
                console.log('Moved card:', card.title);
                
                toDeck.cards.push(card);
                console.log('Target deck now has', toDeck.cards.length, 'cards');
                
                this.saveData();
                this.render();
            }
        }
    }

    // UI Management
    toggleDataMenu() {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('active');
    }

    closeDataMenu() {
        document.querySelector('.dropdown').classList.remove('active');
    }

    hideAllModals() {
        document.getElementById('deckModal').classList.remove('active');
        document.getElementById('cardModal').classList.remove('active');
        document.getElementById('cardDetailModal').classList.remove('active');
        document.getElementById('backupModal').classList.remove('active');
    }

    // Backup Modal Management
    showBackupModal() {
        const modal = document.getElementById('backupModal');
        modal.classList.add('active');
    }

    hideBackupModal() {
        document.getElementById('backupModal').classList.remove('active');
    }

    // Update source indicator in detail view
    updateSourceIndicator(card) {
        const indicator = document.getElementById('detailSourceIndicator');
        if (!indicator) return;

        let iconClass, iconSymbol, statusText;

        // Simplified - just show vault icon for all data
        indicator.innerHTML = `
            <i class="source-icon vault fas fa-archive"></i>
            <span>Datos vault</span>
        `;

        // Add last modified date if available
        if (card.updatedAt) {
            const modifiedDate = this.formatDate(card.updatedAt);
            indicator.innerHTML += `<span class="modified-date"> • ${modifiedDate}</span>`;
        }
    }

    // Helper method to check if card has local modifications
    hasLocalModifications(card) {
        try {
            const savedData = localStorage.getItem('cardsBacklog');
            if (!savedData) return false;
            
            const localData = JSON.parse(savedData);
            if (!localData.decks) return false;

            // Look for the card in localStorage
            for (const deck of localData.decks) {
                if (deck.cards) {
                    const localCard = deck.cards.find(c => c.id === card.id);
                    if (localCard) return true;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    // Helper method to check if card exists in vault
    existsInVault(cardId) {
        // This would need access to the original vault data
        // For now, we'll use a simple heuristic based on ID patterns
        // Vault cards typically have structured IDs like "launch-card-001"
        return cardId.includes('-card-') || cardId.includes('launch-') || cardId.includes('vault-');
    }

    // Detail Modal Management
    showDetailModal(deckId, card) {
        console.log('Setting currentDetailCard:', { deckId, card });
        this.currentDetailCard = { deckId, card };
        const modal = document.getElementById('cardDetailModal');
        
        // Populate detail content
        this.populateDetailContent(card);
        
        // Show modal
        modal.classList.add('active');
        
        // Setup mouse parallax after modal is shown
        setTimeout(() => {
            this.setupMouseParallax();
        }, 100);
    }

    hideDetailModal() {
        document.getElementById('cardDetailModal').classList.remove('active');
        this.cleanupMouseParallax();
        this.currentDetailCard = null;
    }

    populateDetailContent(card) {
        // Category
        const categoryElement = document.getElementById('detailCategory');
        if (card.category) {
            categoryElement.textContent = card.category;
            categoryElement.style.display = 'inline-block';
        } else {
            categoryElement.style.display = 'none';
        }
        
        // Title
        document.getElementById('detailTitle').textContent = card.title;
        
        // Date
        document.getElementById('detailDate').textContent = this.formatDate(card.createdAt);
        
        // Source indicator
        this.updateSourceIndicator(card);
        
        // Description
        const descElement = document.getElementById('detailDescription');
        const descField = document.getElementById('detailDescriptionField');
        if (card.description && card.description.trim()) {
            descElement.textContent = card.description;
            descField.style.display = 'block';
        } else {
            descElement.innerHTML = '<div class="empty-message">Sin descripción</div>';
            descField.style.display = 'block';
        }
        
        // Notes
        const notesElement = document.getElementById('detailNotes');
        const notesField = document.getElementById('detailNotesField');
        if (card.notes && card.notes.trim()) {
            notesElement.textContent = card.notes;
            notesField.style.display = 'block';
        } else {
            notesElement.innerHTML = '<div class="empty-message">Sin notas adicionales</div>';
            notesField.style.display = 'block';
        }
        
        // Hashtags
        const hashtagsElement = document.getElementById('detailHashtags');
        const hashtagsField = document.getElementById('detailHashtagsField');
        if (card.hashtags && card.hashtags.length > 0) {
            hashtagsElement.innerHTML = card.hashtags
                .map(tag => `<span class="detail-hashtag">#${tag}</span>`)
                .join('');
            hashtagsField.style.display = 'block';
        } else {
            hashtagsElement.innerHTML = '<div class="empty-message">Sin hashtags</div>';
            hashtagsField.style.display = 'block';
        }
        
        // Images - Cover and Gallery
        const imagesElement = document.getElementById('detailImages');
        const imagesField = document.getElementById('detailImagesField');
        
        let imagesHTML = '';
        
        // Cover image
        if (card.coverImage) {
            imagesHTML += `
                <div class="detail-image-section">
                    <label class="detail-image-label">Imagen de Portada:</label>
                    <div class="detail-cover-image">
                        <img src="${card.coverImage}" alt="Cover image" onerror="this.style.display='none'">
                    </div>
                </div>
            `;
        }
        
        // Gallery images
        if (card.galleryImages && card.galleryImages.length > 0) {
            imagesHTML += `
                <div class="detail-image-section">
                    <label class="detail-image-label">Galería (${card.galleryImages.length}):</label>
                    <div class="card-gallery">
                        ${card.galleryImages && card.galleryImages.length > 0 ? 
                            card.galleryImages.slice(0, 3).map((img, index) => 
                                `<img src="${img}" alt="Gallery image" class="gallery-thumb" onclick="app.openLightbox('${card.id}', ${index})">`
                            ).join('') + 
                            (card.galleryImages.length > 3 ? `<div class="gallery-more" onclick="app.openLightbox('${card.id}', 3)">+${card.galleryImages.length - 3}</div>` : '')
                        : ''}
                    </div>
                </div>
            `;
        }
        
        if (imagesHTML) {
            imagesElement.innerHTML = imagesHTML;
            imagesField.style.display = 'block';
        } else {
            imagesField.style.display = 'none';
        }
    }

    editFromDetail() {
        if (this.currentDetailCard && this.currentDetailCard.card) {
            this.hideDetailModal();
            setTimeout(() => {
                this.showCardModal(this.currentDetailCard.deckId, this.currentDetailCard.card);
            }, 300);
        }
    }

    deleteFromDetail() {
        if (this.currentDetailCard) {
            this.hideDetailModal();
            this.deleteCard(this.currentDetailCard.deckId, this.currentDetailCard.card.id);
        }
    }

    // Toggle deck layout between horizontal and column
    toggleDeckLayout(deckId) {
        const deck = this.decks.find(d => d.id === deckId);
        if (deck) {
            deck.layout = deck.layout === 'horizontal' ? 'column' : 'horizontal';
            this.saveData();
            this.render();
        }
    }

    // Lightbox functionality for gallery images
    openLightbox(cardId, imageIndex) {
        const card = this.findCardById(cardId);
        if (!card || !card.galleryImages || card.galleryImages.length === 0) return;

        this.currentLightboxCard = card;
        this.currentLightboxIndex = imageIndex;

        const lightbox = document.getElementById('imageLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const counter = document.getElementById('lightboxCounter');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        lightboxImage.src = card.galleryImages[imageIndex];
        counter.textContent = `${imageIndex + 1} / ${card.galleryImages.length}`;

        prevBtn.disabled = imageIndex === 0;
        nextBtn.disabled = imageIndex === card.galleryImages.length - 1;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('imageLightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.currentLightboxCard = null;
        this.currentLightboxIndex = -1;
    }

    prevLightboxImage() {
        if (this.currentLightboxCard && this.currentLightboxIndex > 0) {
            this.openLightbox(this.currentLightboxCard.id, this.currentLightboxIndex - 1);
        }
    }

    nextLightboxImage() {
        if (this.currentLightboxCard && this.currentLightboxIndex < this.currentLightboxCard.galleryImages.length - 1) {
            this.openLightbox(this.currentLightboxCard.id, this.currentLightboxIndex + 1);
        }
    }

    findCardById(cardId) {
        for (const deck of this.decks) {
            const card = deck.cards.find(c => c.id === cardId);
            if (card) return card;
        }
        return null;
    }

    // Toggle simplified view mode
    toggleViewMode() {
        this.isSimplifiedView = !this.isSimplifiedView;
        const btn = document.getElementById('viewModeBtn');
        const icon = btn.querySelector('i');
        
        if (this.isSimplifiedView) {
            icon.className = 'fas fa-th-large';
            btn.title = 'Vista completa';
            document.body.classList.add('simplified-view');
        } else {
            icon.className = 'fas fa-list';
            btn.title = 'Vista simplificada';
            document.body.classList.remove('simplified-view');
        }
        
        this.render();
    }

    // Mouse Parallax Effects for Card Detail (Ana Cards style)
    setupMouseParallax() {
        const modal = document.getElementById('cardDetailModal');
        if (!modal || !modal.classList.contains('active')) return;
        
        // Clean up any existing handlers first
        this.cleanupMouseParallax();
        
        let ticking = false;
        
        const updateMouseParallax = (e) => {
            const card = modal.querySelector('.detail-card');
            const parallaxBg = modal.querySelector('.detail-parallax-bg');
            const categoryBadge = modal.querySelector('.detail-category-badge');
            const title = modal.querySelector('.detail-title');
            
            if (!card) return;
            
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to card center (-1 to 1)
            const mouseXPercent = (e.clientX - cardCenterX) / (rect.width / 2);
            const mouseYPercent = (e.clientY - cardCenterY) / (rect.height / 2);
            
            // Clamp values to prevent extreme movements
            const clampedX = Math.max(-1, Math.min(1, mouseXPercent));
            const clampedY = Math.max(-1, Math.min(1, mouseYPercent));
            
            // Card container - subtle movement with 3D rotation
            const cardMoveX = clampedX * 12;
            const cardMoveY = clampedY * 12;
            const cardRotateX = clampedY * -5;
            const cardRotateY = clampedX * 5;
            
            card.style.transform = `translateX(${cardMoveX}px) translateY(${cardMoveY}px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`;
            
            // Background - opposite direction, more movement
            if (parallaxBg) {
                const bgMoveX = clampedX * -20;
                const bgMoveY = clampedY * -20;
                const bgScale = 1 + (Math.abs(clampedX) + Math.abs(clampedY)) * 0.03;
                
                parallaxBg.style.transform = `translateX(${bgMoveX}px) translateY(${bgMoveY}px) scale(${bgScale})`;
            }
            
            // Category badge - floating effect
            if (categoryBadge) {
                const badgeMoveX = clampedX * 8;
                const badgeMoveY = clampedY * 8;
                categoryBadge.style.transform = `translateX(${badgeMoveX}px) translateY(${badgeMoveY}px)`;
            }
            
            // Title - subtle floating
            if (title) {
                const titleMoveX = clampedX * 5;
                const titleMoveY = clampedY * 5;
                title.style.transform = `translateX(${titleMoveX}px) translateY(${titleMoveY}px)`;
            }
            
            ticking = false;
        };
        
        // Mouse move handler with throttling
        const handleMouseMove = (e) => {
            if (!ticking) {
                requestAnimationFrame(() => updateMouseParallax(e));
                ticking = true;
            }
        };
        
        // Mouse leave handler - reset positions
        const handleMouseLeave = () => {
            const card = modal.querySelector('.detail-card');
            const parallaxBg = modal.querySelector('.detail-parallax-bg');
            const categoryBadge = modal.querySelector('.detail-category-badge');
            const title = modal.querySelector('.detail-title');
            
            // Smooth return to center
            if (card) {
                card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.transform = 'translateX(0) translateY(0) rotateX(0) rotateY(0)';
            }
            
            if (parallaxBg) {
                parallaxBg.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                parallaxBg.style.transform = 'translateX(0) translateY(0) scale(1)';
            }
            
            if (categoryBadge) {
                categoryBadge.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                categoryBadge.style.transform = 'translateX(0) translateY(0)';
            }
            
            if (title) {
                title.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                title.style.transform = 'translateX(0) translateY(0)';
            }
            
            // Clear transitions after animation
            setTimeout(() => {
                if (card) card.style.transition = '';
                if (parallaxBg) parallaxBg.style.transition = '';
                if (categoryBadge) categoryBadge.style.transition = '';
                if (title) title.style.transition = '';
            }, 600);
        };
        
        // Add event listeners to the modal container
        modal.addEventListener('mousemove', handleMouseMove);
        modal.addEventListener('mouseleave', handleMouseLeave);
        
        // Store handlers for cleanup
        this.mouseParallaxHandlers = {
            modal: modal,
            mousemove: handleMouseMove,
            mouseleave: handleMouseLeave
        };
    }

    // Cleanup parallax handlers
    cleanupMouseParallax() {
        if (this.mouseParallaxHandlers) {
            const { modal, mousemove, mouseleave } = this.mouseParallaxHandlers;
            if (modal) {
                modal.removeEventListener('mousemove', mousemove);
                modal.removeEventListener('mouseleave', mouseleave);
            }
            this.mouseParallaxHandlers = null;
        }
    }

    // Legacy method for compatibility
    setupParallaxEffect() {
        // This is called during init, but we setup mouse parallax when modal opens
    }

    // Search and Filter
    handleSearch(query) {
        this.currentSearchQuery = query.toLowerCase();
        this.render();
    }

    updateFilters() {
        this.updateCategoryFilters();
        this.updateHashtagFilters();
    }

    updateCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        container.innerHTML = '';
        
        Array.from(this.allCategories).sort().forEach(category => {
            const tag = document.createElement('span');
            tag.className = 'filter-tag';
            tag.textContent = category;
            tag.addEventListener('click', () => this.toggleCategoryFilter(category, tag));
            container.appendChild(tag);
        });
    }

    updateHashtagFilters() {
        const container = document.getElementById('hashtagFilters');
        container.innerHTML = '';
        
        Array.from(this.allHashtags).sort().forEach(hashtag => {
            const tag = document.createElement('span');
            tag.className = 'filter-tag';
            tag.textContent = `#${hashtag}`;
            tag.addEventListener('click', () => this.toggleHashtagFilter(hashtag, tag));
            container.appendChild(tag);
        });
    }

    toggleCategoryFilter(category, element) {
        element.classList.toggle('active');
        this.render();
    }

    toggleHashtagFilter(hashtag, element) {
        element.classList.toggle('active');
        this.render();
    }

    getActiveFilters() {
        const activeCategories = Array.from(document.querySelectorAll('#categoryFilters .filter-tag.active'))
            .map(el => el.textContent.toLowerCase());
        const activeHashtags = Array.from(document.querySelectorAll('#hashtagFilters .filter-tag.active'))
            .map(el => el.textContent.substring(1).toLowerCase());
        
        return { categories: activeCategories, hashtags: activeHashtags };
    }

    filterCards(cards) {
        const { categories, hashtags } = this.getActiveFilters();
        const query = this.currentSearchQuery || '';
        
        return cards.filter(card => {
            // Search query filter
            if (query) {
                const searchText = `${card.title} ${card.description} ${card.notes} ${card.hashtags?.join(' ') || ''}`.toLowerCase();
                if (!searchText.includes(query)) return false;
            }
            
            // Category filter
            if (categories.length > 0) {
                if (!card.category || !categories.includes(card.category.toLowerCase())) return false;
            }
            
            // Hashtag filter
            if (hashtags.length > 0) {
                if (!card.hashtags || !hashtags.some(tag => card.hashtags.includes(tag))) return false;
            }
            
            return true;
        });
    }

    // Rendering
    render() {
        const container = document.getElementById('decksContainer');
        container.innerHTML = '';
        
        if (this.decks.length === 0) {
            this.renderEmptyState(container);
            return;
        }
        
        // Sort decks: Ideas Generales first, then by order, then by creation date
        const sortedDecks = [...this.decks].sort((a, b) => {
            // Ideas Generales always first
            if (a.name === 'Ideas Generales') return -1;
            if (b.name === 'Ideas Generales') return 1;
            
            // Then by order if specified
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            if (a.order !== undefined) return -1;
            if (b.order !== undefined) return 1;
            
            // Finally by creation date
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        sortedDecks.forEach(deck => {
            const deckElement = this.createDeckElement(deck);
            container.appendChild(deckElement);
        });
    }

    renderEmptyState(container) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-layer-group"></i>
            <h3>No hay decks creados</h3>
            <p>Crea tu primer deck para comenzar a organizar tus ideas</p>
        `;
        container.appendChild(emptyState);
    }

    createDeckElement(deck) {
        const filteredCards = this.filterCards(deck.cards);
        
        const deckDiv = document.createElement('div');
        deckDiv.className = `deck ${deck.layout === 'horizontal' ? 'deck-horizontal' : 'deck-column'}`;
        // Ideas Generales deck is not draggable but can receive cards
        deckDiv.draggable = deck.name !== 'Ideas Generales';
        deckDiv.dataset.deckId = deck.id;
        deckDiv.innerHTML = `
            <div class="deck-header">
                <div>
                    <div class="deck-title">${deck.name}</div>
                    <div class="deck-description">${deck.description || ''}</div>
                </div>
                <div class="deck-actions">
                    <button class="deck-action-btn" onclick="app.toggleDeckLayout('${deck.id}')" title="Cambiar layout">
                        <i class="fas ${deck.layout === 'horizontal' ? 'fa-grip-lines' : 'fa-grip-vertical'}"></i>
                    </button>
                    <button class="deck-action-btn" onclick="app.showDeckModal(app.decks.find(d => d.id === '${deck.id}'))" title="Editar deck">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="deck-action-btn" onclick="app.deleteDeck('${deck.id}')" title="Eliminar deck">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="deck-stats">
                <span><i class="fas fa-cards-blank"></i> ${filteredCards.length} cards</span>
                <span><i class="fas fa-calendar"></i> ${this.formatDate(deck.createdAt)}</span>
            </div>
            <div class="cards-grid">
                ${filteredCards.map(card => this.createCardHTML(card, deck.id)).join('')}
                <div class="add-card-btn" onclick="app.showCardModal('${deck.id}')">
                    <i class="fas fa-plus"></i>
                    <span>Agregar Card</span>
                </div>
            </div>
        `;
        
        // Add drag and drop functionality
        this.addDragAndDropToCards(deckDiv, deck.id);
        this.addDragAndDropToDecks(deckDiv, deck.id);
        
        return deckDiv;
    }

    createCardHTML(card, deckId) {
        const categoryHTML = card.category ? `<div class="card-category">${card.category}</div>` : '';
        const hashtagsHTML = card.hashtags && card.hashtags.length > 0 
            ? `<div class="card-hashtags">${card.hashtags.map(tag => `<span class="hashtag">#${tag}</span>`).join('')}</div>`
            : '';
        // Build images HTML with cover and gallery
        let imagesHTML = '';
        if (card.coverImage || (card.galleryImages && card.galleryImages.length > 0)) {
            imagesHTML = '<div class="card-images-container">';
            
            // Cover image
            if (card.coverImage) {
                imagesHTML += `<div class="card-cover-image">
                    <img src="${card.coverImage}" alt="Cover image" onerror="this.style.display='none'">
                </div>`;
            }
            
            // Gallery images
            if (card.galleryImages && card.galleryImages.length > 0) {
                const visibleImages = card.galleryImages.slice(0, 3);
                const remainingCount = card.galleryImages.length - 3;
                
                imagesHTML += '<div class="card-gallery-images">';
                visibleImages.forEach((img, index) => {
                    imagesHTML += `<img src="${img}" alt="Gallery image" class="gallery-thumb" onclick="app.openLightbox('${card.id}', ${index})" onerror="this.style.display='none'">`;
                });
                
                if (remainingCount > 0) {
                    imagesHTML += `<div class="gallery-more" onclick="app.openLightbox('${card.id}', 3)">+${remainingCount}</div>`;
                }
                imagesHTML += '</div>';
            }
            
            imagesHTML += '</div>';
        }
        
        const simplifiedClass = this.isSimplifiedView ? ' simplified' : '';
        
        return `
            <div class="card${simplifiedClass}" data-card-id="${card.id}" data-deck-id="${deckId}" onclick="app.showDetailModal('${deckId}', app.decks.find(d => d.id === '${deckId}').cards.find(c => c.id === '${card.id}'))">
                <div class="card-header">
                    <div class="card-title">${card.title}</div>
                    <div class="card-actions">
                        <div class="drag-handle" draggable="true" title="Arrastrar para mover">
                            <i class="fas fa-grip-vertical"></i>
                        </div>
                        <button class="card-action-btn" onclick="event.stopPropagation(); app.showCardModal('${deckId}', app.decks.find(d => d.id === '${deckId}').cards.find(c => c.id === '${card.id}'))" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="card-action-btn" onclick="event.stopPropagation(); app.deleteCard('${deckId}', '${card.id}')" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${categoryHTML}
                <div class="card-description">${card.description || ''}</div>
                ${hashtagsHTML}
                <div class="card-images-section">${imagesHTML}</div>
            </div>
        `;
    }

    // Drag and Drop for Cards - With Drag Handle
    addDragAndDropToCards(deckElement, deckId) {
        const dragHandles = deckElement.querySelectorAll('.drag-handle');
        const cardsGrid = deckElement.querySelector('.cards-grid');
        
        dragHandles.forEach(handle => {
            const card = handle.closest('.card');
            
            handle.addEventListener('dragstart', (e) => {
                e.stopPropagation();
                const cardId = card.dataset.cardId;
                const fromDeckId = card.dataset.deckId;
                
                console.log('Drag started - cardId:', cardId, 'fromDeckId:', fromDeckId);
                
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    cardId: cardId,
                    fromDeckId: fromDeckId
                }));
                card.classList.add('dragging');
                document.body.classList.add('dragging-card');
            });
            
            handle.addEventListener('dragend', () => {
                const card = handle.closest('.card');
                card.classList.remove('dragging');
                document.body.classList.remove('dragging-card');
                document.querySelectorAll('.deck').forEach(d => d.classList.remove('drop-zone-active'));
                // Remove all placeholders
                document.querySelectorAll('.card-drop-placeholder').forEach(p => p.remove());
            });
        });

        // Enhanced drag over for same deck vs different deck
        cardsGrid.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingCard = document.querySelector('.dragging');
        if (!draggingCard) return;

        const draggingFromDeckId = draggingCard.dataset.deckId;

        if (draggingFromDeckId === deckId) {
            // Same deck - show placeholder for reordering
            this.showCardPlaceholder(e, cardsGrid, deckId);
        } else {
            // Different deck - show "soltar aquí" animation
            deckElement.classList.add('drop-zone-active');
        }
    });

    cardsGrid.addEventListener('dragleave', (e) => {
        const rect = cardsGrid.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            deckElement.classList.remove('drop-zone-active');
            // Remove placeholders when leaving
            cardsGrid.querySelectorAll('.card-drop-placeholder').forEach(p => p.remove());
        }
    });

    cardsGrid.addEventListener('drop', (e) => {
        e.preventDefault();
        deckElement.classList.remove('drop-zone-active');

        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            console.log('Moving card:', data.cardId, 'from', data.fromDeckId, 'to', deckId);

            if (data.fromDeckId !== deckId) {
                // Moving between different decks
                this.moveCard(data.cardId, data.fromDeckId, deckId);
            } else {
                // Reordering within same deck
                this.reorderCardsInDeckWithPlaceholder(deckId, e);
            }
        } catch (error) {
            console.error('Error moving card:', error);
        }
    });
}

// Helper function to get the element after which to insert the dragged item
getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Get drop position for cards moved between decks
getDropPosition(e, cardsGrid) {
    const cardElements = [...cardsGrid.querySelectorAll('.card')];
    let position = cardElements.length; // Default to end

    for (let i = 0; i < cardElements.length; i++) {
        const rect = cardElements[i].getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
            position = i;
            break;
        }
    }

    return position;
}

// Move card to specific position in target deck
moveCardToPosition(cardId, fromDeckId, toDeckId, position) {
    const fromDeck = this.decks.find(d => d.id === fromDeckId);
    const toDeck = this.decks.find(d => d.id === toDeckId);

    if (fromDeck && toDeck && fromDeckId !== toDeckId) {
        const cardIndex = fromDeck.cards.findIndex(c => c.id === cardId);
        if (cardIndex !== -1) {
            const card = fromDeck.cards.splice(cardIndex, 1)[0];

            // Add order property to card
            card.order = position;

            // Insert at specific position
            if (position >= toDeck.cards.length) {
                toDeck.cards.push(card);
            } else {
                toDeck.cards.splice(position, 0, card);
            }

            // Update order indices for all cards in target deck
            toDeck.cards.forEach((c, index) => {
                c.order = index;
            });

            this.saveData();
            this.render();
        }
    }
}

// Reorder cards within the same deck based on DOM position
reorderCardsInDeck(deckId) {
    console.log('Reordering cards in deck:', deckId);
    const deck = this.decks.find(d => d.id === deckId);
    if (!deck) return;

    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`);
    if (!deckElement) return;

    const cardsGrid = deckElement.querySelector('.cards-grid');
    if (!cardsGrid) return;

    const cardElements = Array.from(cardsGrid.querySelectorAll('.card'));
    const newOrder = [];

    cardElements.forEach((cardEl, index) => {
        const cardId = cardEl.dataset.cardId;
        const card = deck.cards.find(c => c.id === cardId);
        if (card) {
            card.order = index;
            newOrder.push(card);
        }
    });

    deck.cards = newOrder;
    this.saveData();
    console.log('Reordered', newOrder.length, 'cards');
}

// Drag and Drop for Decks
addDragAndDropToDecks(deckElement, deckId) {
    // Only add deck dragging events if the deck is draggable
    if (deckElement.draggable) {
        deckElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                deckId: deckId,
                type: 'deck'
            }));
            deckElement.classList.add('deck-dragging');
        });

        deckElement.addEventListener('dragend', () => {
            deckElement.classList.remove('deck-dragging');
        });

        deckElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingDeck = document.querySelector('.deck-dragging');
            if (draggingDeck && draggingDeck !== deckElement) {
                const rect = deckElement.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                const container = deckElement.parentNode;

                if (e.clientY < midY) {
                    container.insertBefore(draggingDeck, deckElement);
                } else {
                    container.insertBefore(draggingDeck, deckElement.nextSibling);
                }
            }
        });
    }

    // Container drop handling - only add once
    if (!this.containerDropHandlerAdded) {
        const container = document.getElementById('decksContainer');
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (data.type === 'deck') {
                    this.reorderDecks();
                }
            } catch (error) {
                console.error('Error reordering decks:', error);
            }
        });

        container.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        this.containerDropHandlerAdded = true;
    }

    // Get drop position for cards moved between decks
    getDropPosition(e, cardsGrid) {
        const cardElements = [...cardsGrid.querySelectorAll('.card')];
        let position = cardElements.length; // Default to end
        
        for (let i = 0; i < cardElements.length; i++) {
            const rect = cardElements[i].getBoundingClientRect();
            if (e.clientY < rect.top + rect.height / 2) {
                position = i;
                break;
            }
        }
        
        return position;
    }

    // Move card to specific position in target deck
    moveCardToPosition(cardId, fromDeckId, toDeckId, position) {
        const fromDeck = this.decks.find(d => d.id === fromDeckId);
        const toDeck = this.decks.find(d => d.id === toDeckId);
        
        if (fromDeck && toDeck && fromDeckId !== toDeckId) {
            const cardIndex = fromDeck.cards.findIndex(c => c.id === cardId);
            if (cardIndex !== -1) {
                const card = fromDeck.cards.splice(cardIndex, 1)[0];
                
                // Add order property to card
                card.order = position;
                
                // Insert at specific position
                if (position >= toDeck.cards.length) {
                    toDeck.cards.push(card);
                } else {
                    toDeck.cards.splice(position, 0, card);
                }
                
                // Update order indices for all cards in target deck
                toDeck.cards.forEach((c, index) => {
                    c.order = index;
                });
                
                this.saveData();
                this.render();
            }
        }
    }

    // Reorder cards within the same deck based on DOM position
    reorderCardsInDeck(deckId) {
        console.log('Reordering cards in deck:', deckId);
        const deck = this.decks.find(d => d.id === deckId);
        if (!deck) return;

        const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`);
        if (!deckElement) return;
        
        const cardsGrid = deckElement.querySelector('.cards-grid');
        if (!cardsGrid) return;
        
        const cardElements = Array.from(cardsGrid.querySelectorAll('.card'));
        const newOrder = [];

        cardElements.forEach((cardEl, index) => {
            const cardId = cardEl.dataset.cardId;
            const card = deck.cards.find(c => c.id === cardId);
            if (card) {
                card.order = index;
                newOrder.push(card);
            }
        });

        deck.cards = newOrder;
        this.saveData();
        console.log('Reordered', newOrder.length, 'cards');
    }

    // Drag and Drop for Decks
    addDragAndDropToDecks(deckElement, deckId) {
        // Only add deck dragging events if the deck is draggable
        if (deckElement.draggable) {
            deckElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    deckId: deckId,
                    type: 'deck'
                }));
                deckElement.classList.add('deck-dragging');
            });

            deckElement.addEventListener('dragend', () => {
                deckElement.classList.remove('deck-dragging');
            });

            deckElement.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggingDeck = document.querySelector('.deck-dragging');
                if (draggingDeck && draggingDeck !== deckElement) {
                    const rect = deckElement.getBoundingClientRect();
                    const midY = rect.top + rect.height / 2;
                    const container = deckElement.parentNode;
                    
                    if (e.clientY < midY) {
                        container.insertBefore(draggingDeck, deckElement);
                    } else {
                        container.insertBefore(draggingDeck, deckElement.nextSibling);
                    }
                }
            });
        }

        // Container drop handling - only add once
        if (!this.containerDropHandlerAdded) {
            const container = document.getElementById('decksContainer');
            container.addEventListener('drop', (e) => {
                e.preventDefault();
                try {
                    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                    if (data.type === 'deck') {
                        this.reorderDecks();
                    }
                } catch (error) {
                    console.error('Error reordering decks:', error);
                }
            });

            container.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            this.containerDropHandlerAdded = true;
        }
    }

    // Reorder decks based on DOM position
    reorderDecks() {
        const container = document.getElementById('decksContainer');
        const deckElements = Array.from(container.querySelectorAll('.deck'));
        const newOrder = [];

        deckElements.forEach((deckEl, index) => {
            const deckId = deckEl.dataset.deckId;
            const deck = this.decks.find(d => d.id === deckId);
            if (deck) {
                // Update order, but keep Ideas Generales at 0
                if (deck.name !== 'Ideas Generales') {
                    deck.order = index + 1;
                }
                newOrder.push(deck);
            }
        });

        this.decks = newOrder;
        this.saveData();
    }

    // Data Export/Import
    exportToCSV() {
        const csvData = [];
        csvData.push(['Deck', 'Título', 'Categoría', 'Descripción', 'Notas', 'Hashtags', 'Imágenes', 'Fecha Creación']);
        
        this.decks.forEach(deck => {
            deck.cards.forEach(card => {
                csvData.push([
                    deck.name,
                    card.title,
                    card.category || '',
                    card.description || '',
                    card.notes || '',
                    card.hashtags ? card.hashtags.map(tag => `#${tag}`).join(' ') : '',
                    card.images ? card.images.join(', ') : '',
                    card.createdAt
                ]);
            });
        });
        
        const csvContent = csvData.map(row => 
            row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        ).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `idea-deck-manager-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    }

    importFromCSV() {
        document.getElementById('fileInput').click();
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
                
                const importedCards = [];
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    const values = this.parseCSVLine(line);
                    if (values.length >= 8) {
                        importedCards.push({
                            deckName: values[0],
                            title: values[1],
                            category: values[2],
                            description: values[3],
                            notes: values[4],
                            hashtags: this.parseHashtags(values[5]),
                            images: this.parseImages(values[6]),
                            createdAt: values[7] || new Date().toISOString()
                        });
                    }
                }
                
                this.processImportedCards(importedCards);
            } catch (error) {
                alert('Error al importar el archivo CSV. Verifica el formato.');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    processImportedCards(importedCards) {
        const deckMap = new Map();
        
        // Group cards by deck name
        importedCards.forEach(cardData => {
            if (!deckMap.has(cardData.deckName)) {
                deckMap.set(cardData.deckName, []);
            }
            deckMap.get(cardData.deckName).push(cardData);
        });
        
        // Create or update decks
        deckMap.forEach((cards, deckName) => {
            let deck = this.decks.find(d => d.name === deckName);
            if (!deck) {
                deck = {
                    id: this.generateId(),
                    name: deckName,
                    description: `Deck importado - ${new Date().toLocaleDateString()}`,
                    cards: [],
                    createdAt: new Date().toISOString()
                };
                this.decks.push(deck);
            }
            
            cards.forEach(cardData => {
                const newCard = {
                    id: this.generateId(),
                    title: cardData.title,
                    category: cardData.category,
                    description: cardData.description,
                    notes: cardData.notes,
                    hashtags: cardData.hashtags,
                    images: cardData.images,
                    createdAt: cardData.createdAt
                };
                deck.cards.push(newCard);
            });
        });
        
        this.saveData();
        this.updateCategoriesAndHashtags();
        this.render();
        this.updateFilters();
        alert(`Importación completada. Se importaron ${importedCards.length} cards.`);
    }

    clearData() {
        if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
            this.decks = [];
            this.allCategories.clear();
            this.allHashtags.clear();
            localStorage.removeItem('cardsBacklog');
            this.createDefaultDeck();
            this.render();
            this.updateFilters();
        }
    }

    // Generate static JSON file for local development (legacy - now handled by saveToJSON)
    generateLocalJSON() {
        this.saveToJSON();
    }
}

// Initialize the application
const app = new IdeaDeckManager();
