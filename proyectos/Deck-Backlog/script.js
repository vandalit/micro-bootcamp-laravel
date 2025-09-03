/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                          🎯 IDEA DECK MANAGER                                                   ║
║                                  Sistema de gestión de ideas y proyectos                                        ║
║                                        con diseño Bento moderno                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

class IdeaDeckManager {
    constructor() {
        this.decks = [];
        this.currentEditingDeck = null;
        this.currentEditingCard = null;
        this.allCategories = new Set();
        this.allHashtags = new Set();
        this.storageMode = 'web'; // 'web' (localStorage) or 'local' (JSON)
        this.isGitHubPages = false;
<<<<<<< HEAD
=======
        this.vaultData = null; // Store original vault data for comparison
>>>>>>> 0abb2eb (checkpoint)
        
        this.init();
    }

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🚀 INITIALIZATION                                                      ║
    ║                                    Sistema de inicialización                                                  ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🎮 EVENT BINDING                                                       ║
    ║                                   Gestión de eventos del DOM                                                  ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
    // Event Binding
    bindEvents() {
        // Header actions
        document.getElementById('createDeckBtn').addEventListener('click', () => this.showDeckModal());
        document.getElementById('dataMenuBtn').addEventListener('click', () => this.toggleDataMenu());
        
        // Data menu actions
        document.getElementById('exportBtn').addEventListener('click', () => this.exportToCSV());
        document.getElementById('importBtn').addEventListener('click', () => this.importFromCSV());
        document.getElementById('backupBtn').addEventListener('click', () => this.showBackupModal());
        document.getElementById('clearDataBtn').addEventListener('click', () => this.clearData());
        
        
        // Local-only feature
        const localBtn = document.getElementById('localBtn');
        if (localBtn) {
            localBtn.addEventListener('click', () => this.generateLocalJSON());
        }
        
        // Modal events
        document.getElementById('closeDeckModal').addEventListener('click', () => this.hideDeckModal());
        document.getElementById('cancelDeckBtn').addEventListener('click', () => this.hideDeckModal());
        document.getElementById('closeCardModal').addEventListener('click', () => this.hideCardModal());
        document.getElementById('cancelCardBtn').addEventListener('click', () => this.hideCardModal());
        
        // Form submissions
        document.getElementById('deckForm').addEventListener('submit', (e) => this.handleDeckSubmit(e));
        document.getElementById('cardForm').addEventListener('submit', (e) => this.handleCardSubmit(e));
        
        // Search and filters
        document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // File input for import
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileImport(e));
        
        // Detail modal events
        document.getElementById('closeDetailModal').addEventListener('click', () => this.hideDetailModal());
        
        // Backup modal events
        document.getElementById('closeBackupModal').addEventListener('click', () => this.hideBackupModal());
        document.getElementById('confirmBackupBtn').addEventListener('click', () => this.hideBackupModal());
        
<<<<<<< HEAD
        // Debug all clicks to see what's happening
        document.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target, 'ID:', e.target.id, 'Classes:', e.target.className);
            
            if (e.target.id === 'editDetailBtn') {
                console.log('DIRECT HIT: editDetailBtn clicked');
                e.preventDefault();
                e.stopPropagation();
                this.editFromDetail();
                return;
            }
            
            // Check if clicked element is inside editDetailBtn
            const editBtn = e.target.closest('#editDetailBtn');
            if (editBtn) {
                console.log('CLOSEST HIT: inside editDetailBtn');
                e.preventDefault();
                e.stopPropagation();
                this.editFromDetail();
                return;
            }
            
            if (e.target.id === 'deleteDetailBtn') {
                console.log('DIRECT HIT: deleteDetailBtn clicked');
                e.preventDefault();
                e.stopPropagation();
                this.deleteFromDetail();
                return;
            }
            
            const deleteBtn = e.target.closest('#deleteDetailBtn');
            if (deleteBtn) {
                console.log('CLOSEST HIT: inside deleteDetailBtn');
                e.preventDefault();
                e.stopPropagation();
                this.deleteFromDetail();
=======
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
>>>>>>> 0abb2eb (checkpoint)
                return;
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        💾 DATA MANAGEMENT                                                     ║
    ║                         Sistema híbrido vault.json + localStorage                                            ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
    // Data Management
    async loadData() {
        console.log('Loading data: vault.json first, then localStorage merge...');
        
        // Step 1: Always load vault.json as base data
        let vaultData = null;
        try {
            const response = await fetch('./vault.json');
            if (response.ok) {
                vaultData = await response.json();
<<<<<<< HEAD
=======
                this.vaultData = JSON.parse(JSON.stringify(vaultData)); // Deep copy for comparison
>>>>>>> 0abb2eb (checkpoint)
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
            order: 0,
            layout: 'landscape', // Default to landscape for Ideas Generales
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🛠️ UTILITY FUNCTIONS                                                   ║
    ║                                    Funciones auxiliares                                                      ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        📁 DECK MANAGEMENT                                                     ║
    ║                                   Gestión de decks y CRUD                                                    ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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
                order: this.decks.length,
                layout: 'column', // Default to column for new decks
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
    
    // Toggle deck layout between landscape and column
    toggleDeckLayout(deckId) {
        const deck = this.decks.find(d => d.id === deckId);
        if (deck) {
            deck.layout = deck.layout === 'landscape' ? 'column' : 'landscape';
            this.saveData();
            this.render();
        }
    }

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🃏 CARD MANAGEMENT                                                     ║
    ║                                   Gestión de cards y CRUD                                                    ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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
        const galleryImageString = document.getElementById('cardGalleryImages').value.trim();
        
        if (!title) return;
        
        const hashtags = this.parseHashtags(hashtagString);
        const galleryImages = this.parseImages(galleryImageString);
        
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
                createdAt: new Date().toISOString(),
                order: deck.cards.length
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
        const fromDeck = this.decks.find(d => d.id === fromDeckId);
        const toDeck = this.decks.find(d => d.id === toDeckId);
        
        if (fromDeck && toDeck && fromDeckId !== toDeckId) {
            const cardIndex = fromDeck.cards.findIndex(c => c.id === cardId);
            if (cardIndex !== -1) {
                const card = fromDeck.cards.splice(cardIndex, 1)[0];
                toDeck.cards.push(card);
                this.saveData();
                this.render();
            }
        }
    }

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🎨 UI MANAGEMENT                                                       ║
    ║                                   Gestión de interfaz de usuario                                             ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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
<<<<<<< HEAD
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

        // Determine card source and modification status
        if (!card._source || card._source === 'vault') {
            // Original vault data, check if it has been modified
            const hasLocalModifications = this.hasLocalModifications(card);
            if (hasLocalModifications) {
                iconClass = 'modified';
                iconSymbol = 'fas fa-globe';
                statusText = 'Modificado localmente';
            } else {
                iconClass = 'vault';
                iconSymbol = 'fas fa-archive';
                statusText = 'Datos originales';
            }
        } else if (card._source === 'localStorage') {
            // Check if this is a completely new card or modified existing one
            const existsInVault = this.existsInVault(card.id);
            if (existsInVault) {
                iconClass = 'modified';
                iconSymbol = 'fas fa-globe';
                statusText = 'Modificado localmente';
            } else {
                iconClass = 'new';
                iconSymbol = 'fas fa-feather-alt';
                statusText = 'Creado localmente';
            }
        }

        // Update the indicator
        indicator.innerHTML = `
            <i class="source-icon ${iconClass} ${iconSymbol}"></i>
            <span>${statusText}</span>
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
=======
>>>>>>> 0abb2eb (checkpoint)
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

        // Determine card source and modification status
        if (!card._source || card._source === 'vault') {
            // Original vault data, check if it has been modified
            const hasLocalModifications = this.hasLocalModifications(card);
            if (hasLocalModifications) {
                iconClass = 'modified';
                iconSymbol = 'fas fa-globe';
                statusText = 'Modificado localmente';
            } else {
                iconClass = 'vault';
                iconSymbol = 'fas fa-archive';
                statusText = 'Datos originales';
            }
        } else if (card._source === 'localStorage') {
            // Check if this is a completely new card or modified existing one
            const existsInVault = this.existsInVault(card.id);
            if (existsInVault) {
                iconClass = 'modified';
                iconSymbol = 'fas fa-globe';
                statusText = 'Modificado localmente';
            } else {
                iconClass = 'new';
                iconSymbol = 'fas fa-feather-alt';
                statusText = 'Creado localmente';
            }
        }

        // Update the indicator
        indicator.innerHTML = `
            <i class="source-icon ${iconClass} ${iconSymbol}"></i>
            <span>${statusText}</span>
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
                    if (localCard) {
                        // Check if it's actually different from vault data
                        if (this.vaultData) {
                            const vaultDeck = this.vaultData.decks?.find(d => d.id === deck.id);
                            const vaultCard = vaultDeck?.cards?.find(c => c.id === card.id);
                            if (vaultCard) {
                                // Compare key fields to see if actually modified
                                return localCard.title !== vaultCard.title ||
                                       localCard.description !== vaultCard.description ||
                                       localCard.notes !== vaultCard.notes ||
                                       localCard.category !== vaultCard.category ||
                                       JSON.stringify(localCard.hashtags) !== JSON.stringify(vaultCard.hashtags) ||
                                       JSON.stringify(localCard.images) !== JSON.stringify(vaultCard.images);
                            }
                        }
                        return true;
                    }
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🔍 DETAIL MODAL                                                        ║
    ║                              Vista detallada con efectos parallax                                           ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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
        
        // Images
        const imagesElement = document.getElementById('detailImages');
        const imagesField = document.getElementById('detailImagesField');
        
        let hasImages = false;
        let imagesHTML = '';
        
        // Cover image
        if (card.coverImage) {
            imagesHTML += `<div class="detail-cover-image">
                <img src="${card.coverImage}" alt="Cover image" class="detail-image-cover" onerror="this.style.display='none'">
                <div class="detail-image-label">Portada</div>
            </div>`;
            hasImages = true;
        }
        
        // Gallery images
        if (card.galleryImages && card.galleryImages.length > 0) {
            imagesHTML += `<div class="detail-gallery-images">
                <div class="detail-image-label">Galería</div>
                <div class="detail-gallery-grid">`;
            imagesHTML += card.galleryImages
                .map(img => `<img src="${img}" alt="Gallery image" class="detail-image-gallery" onerror="this.style.display='none'">`)
                .join('');
            imagesHTML += `</div></div>`;
            hasImages = true;
        }
        
        if (hasImages) {
            imagesElement.innerHTML = imagesHTML;
            imagesField.style.display = 'block';
        } else {
            imagesElement.innerHTML = '<div class="empty-message">Sin imágenes</div>';
            imagesField.style.display = 'block';
        }
    }

    editFromDetail() {
        console.log('Edit from detail clicked, currentDetailCard:', this.currentDetailCard);
<<<<<<< HEAD
        console.log('Available decks:', this.decks.map(d => ({id: d.id, name: d.name})));
        
        if (this.currentDetailCard && this.currentDetailCard.card) {
            this.hideDetailModal();
            // Find the actual card object from the deck
            const deck = this.decks.find(d => d.id === this.currentDetailCard.deckId);
            console.log('Found deck:', deck);
            
            if (deck && deck.cards) {
                const card = deck.cards.find(c => c.id === this.currentDetailCard.card.id);
                console.log('Found card:', card);
                
                if (card) {
                    this.showCardModal(this.currentDetailCard.deckId, card);
                } else {
                    console.error('Card not found in deck. Available cards:', deck.cards.map(c => c.id));
                }
            } else {
                console.error('Deck not found or has no cards. Looking for deckId:', this.currentDetailCard.deckId);
=======
        
        if (this.currentDetailCard && this.currentDetailCard.card) {
            // Find the actual card object from the deck
            const deck = this.decks.find(d => d.id === this.currentDetailCard.deckId);
            
            if (deck && deck.cards) {
                const card = deck.cards.find(c => c.id === this.currentDetailCard.card.id);
                
                if (card) {
                    this.hideDetailModal();
                    // Small delay to ensure modal is hidden before showing edit modal
                    setTimeout(() => {
                        this.showCardModal(this.currentDetailCard.deckId, card);
                    }, 100);
                } else {
                    console.error('Card not found in deck');
                }
            } else {
                console.error('Deck not found or has no cards');
>>>>>>> 0abb2eb (checkpoint)
            }
        } else {
            console.error('No currentDetailCard found for editing');
        }
    }

    deleteFromDetail() {
        if (this.currentDetailCard) {
            this.hideDetailModal();
            this.deleteCard(this.currentDetailCard.deckId, this.currentDetailCard.card.id);
        }
    }

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        ✨ PARALLAX EFFECTS                                                    ║
    ║                              Efectos 3D inspirados en Ana Cards                                              ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🔍 SEARCH & FILTER                                                     ║
    ║                                Sistema de búsqueda y filtrado                                                ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🎭 RENDERING ENGINE                                                    ║
    ║                                  Generación de elementos DOM                                                  ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
    // Rendering
    render() {
        const container = document.getElementById('decksContainer');
        container.innerHTML = '';
        
        if (this.decks.length === 0) {
            this.renderEmptyState(container);
            return;
        }
        
        // Sort decks by order
        const sortedDecks = [...this.decks].sort((a, b) => (a.order || 0) - (b.order || 0));
        
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
        // Sort cards by order
        const sortedCards = [...filteredCards].sort((a, b) => (a.order || 0) - (b.order || 0));
        
        const deckDiv = document.createElement('div');
        deckDiv.className = 'deck';
        deckDiv.setAttribute('data-deck-id', deck.id);
        deckDiv.innerHTML = `
            <div class="deck-header">
                <div>
                    <div class="deck-title">${deck.name}</div>
                    <div class="deck-description">${deck.description || ''}</div>
                </div>
                <div class="deck-actions">
                    <button class="deck-action-btn" onclick="app.toggleDeckLayout('${deck.id}')" title="${deck.layout === 'landscape' ? 'Vista en columnas' : 'Vista apaisada'}">
                        <i class="fas fa-${deck.layout === 'landscape' ? 'th' : 'th-large'}"></i>
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
            <div class="cards-grid ${deck.layout === 'landscape' ? 'cards-grid-landscape' : 'cards-grid-column'}" data-deck-id="${deck.id}">
                ${sortedCards.map(card => this.createCardHTML(card, deck.id)).join('')}
                <div class="add-card-btn" onclick="app.showCardModal('${deck.id}')">
                    <i class="fas fa-plus"></i>
                    <span>Agregar Card</span>
                </div>
            </div>
        `;
        
        // Add drag and drop functionality
        this.addDragAndDropToCards(deckDiv, deck.id);
        this.addDragAndDropToDecks(deckDiv);
        
        return deckDiv;
    }

    createCardHTML(card, deckId) {
        const categoryHTML = card.category ? `<div class="card-category">${card.category}</div>` : '';
        const hashtagsHTML = card.hashtags && card.hashtags.length > 0 
            ? `<div class="card-hashtags">${card.hashtags.map(tag => `<span class="hashtag">#${tag}</span>`).join('')}</div>`
            : '';
        
        // Cover image and gallery
        let imagesHTML = '';
        if (card.coverImage || (card.galleryImages && card.galleryImages.length > 0)) {
            imagesHTML = `<div class="card-images">`;
            
            // Cover image first (full width)
            if (card.coverImage) {
                imagesHTML += `<div class="card-cover-container">
                    <img src="${card.coverImage}" alt="Card cover" class="card-cover-image" onerror="this.style.display='none'">
                </div>`;
            }
            
            // Gallery images in horizontal row
            if (card.galleryImages && card.galleryImages.length > 0) {
                const galleryImages = card.galleryImages.slice(0, 3);
                imagesHTML += `<div class="card-gallery-container">`;
                imagesHTML += galleryImages.map(img => `<img src="${img}" alt="Gallery image" class="card-gallery-image" onerror="this.style.display='none'">`).join('');
                
                if (card.galleryImages.length > 3) {
                    imagesHTML += `<div class="card-more-images">+${card.galleryImages.length - 3}</div>`;
                }
                imagesHTML += `</div>`;
            }
            
            imagesHTML += `</div>`;
        }
        
        return `
            <div class="card" draggable="true" data-card-id="${card.id}" data-deck-id="${deckId}" data-card-order="${card.order || 0}" onclick="app.showDetailModal('${deckId}', app.decks.find(d => d.id === '${deckId}').cards.find(c => c.id === '${card.id}'))">
                <div class="card-header">
                    <div class="card-title">${card.title}</div>
                    <div class="card-actions">
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
                ${imagesHTML}
            </div>
        `;
    }

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        🎯 DRAG & DROP SYSTEM                                                  ║
    ║                              Sistema completo de arrastrar y soltar                                         ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
    // Drag and Drop for Cards
    addDragAndDropToCards(deckElement, deckId) {
        const cards = deckElement.querySelectorAll('.card');
        const cardsGrid = deckElement.querySelector('.cards-grid');
        
        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: 'card',
                    cardId: card.dataset.cardId,
                    fromDeckId: card.dataset.deckId,
                    cardOrder: card.dataset.cardOrder
                }));
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        });
        
        cardsGrid.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingCard = cardsGrid.querySelector('.dragging');
            if (!draggingCard) return;
            
            const afterElement = this.getDragAfterElement(cardsGrid, e.clientY, e.clientX);
            if (afterElement == null) {
                cardsGrid.appendChild(draggingCard);
            } else {
                cardsGrid.insertBefore(draggingCard, afterElement);
            }
            deckElement.classList.add('drag-over');
        });
        
        cardsGrid.addEventListener('dragleave', (e) => {
            if (!deckElement.contains(e.relatedTarget)) {
                deckElement.classList.remove('drag-over');
            }
        });
        
        cardsGrid.addEventListener('drop', (e) => {
            e.preventDefault();
            deckElement.classList.remove('drag-over');
            
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (data.type === 'card') {
                    if (data.fromDeckId === deckId) {
                        // Reorder within same deck
                        this.reorderCards(deckId, cardsGrid);
                    } else {
                        // Move between decks
                        this.moveCard(data.cardId, data.fromDeckId, deckId);
                    }
                }
            } catch (error) {
                console.error('Error handling card drop:', error);
            }
        });
    }
    
    // Drag and Drop for Decks
    addDragAndDropToDecks(deckElement) {
        const deckHeader = deckElement.querySelector('.deck-header');
        
        deckHeader.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                type: 'deck',
                deckId: deckElement.dataset.deckId
            }));
            deckElement.classList.add('dragging');
        });
        
        deckHeader.addEventListener('dragend', () => {
            deckElement.classList.remove('dragging');
        });
        
        deckHeader.draggable = true;
        
        deckElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingDeck = document.querySelector('.deck.dragging');
            if (!draggingDeck || draggingDeck === deckElement) return;
            
            const container = document.getElementById('decksContainer');
            const afterElement = this.getDragAfterElement(container, e.clientY, e.clientX, '.deck');
            
            if (afterElement == null) {
                container.appendChild(draggingDeck);
            } else {
                container.insertBefore(draggingDeck, afterElement);
            }
        });
        
        deckElement.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (data.type === 'deck') {
                this.reorderDecks();
            }
        });
    }
    
    // Helper function to get drag after element
    getDragAfterElement(container, y, x, selector = '.card') {
        const draggableElements = [...container.querySelectorAll(`${selector}:not(.dragging):not(.add-card-btn)`)];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = selector === '.deck' ? y - box.top - box.height / 2 : 
                          (y - box.top - box.height / 2) + (x - box.left - box.width / 2) * 0.3;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    // Reorder cards within a deck
    reorderCards(deckId, cardsGrid) {
        const deck = this.decks.find(d => d.id === deckId);
        if (!deck) return;
        
        const cardElements = [...cardsGrid.querySelectorAll('.card')];
        const newOrder = [];
        
        cardElements.forEach((cardElement, index) => {
            const cardId = cardElement.dataset.cardId;
            const card = deck.cards.find(c => c.id === cardId);
            if (card) {
                card.order = index;
                newOrder.push(card);
            }
        });
        
        // Update deck cards with new order
        deck.cards = newOrder;
        this.saveData();
    }
    
    // Reorder decks
    reorderDecks() {
        const deckElements = [...document.querySelectorAll('.deck')];
        
        deckElements.forEach((deckElement, index) => {
            const deckId = deckElement.dataset.deckId;
            const deck = this.decks.find(d => d.id === deckId);
            if (deck) {
                deck.order = index;
            }
        });
        
        this.saveData();
    }

    /*
    ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                        📤 IMPORT/EXPORT                                                       ║
    ║                                Sistema de importación y exportación                                          ║
    ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
    */
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
                    coverImage: cardData.images && cardData.images.length > 0 ? cardData.images[0] : null,
                    order: deck.cards.length,
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

/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                        🚀 APPLICATION STARTUP                                                   ║
║                                     Inicialización de la app                                                    ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
// Initialize the application
const app = new IdeaDeckManager();
