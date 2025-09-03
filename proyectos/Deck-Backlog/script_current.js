class IdeaDeckManager {
    constructor() {
        this.decks = [];
        this.currentEditingDeck = null;
        this.currentEditingCard = null;
        this.allCategories = new Set();
        this.allHashtags = new Set();
        this.storageMode = 'web'; // 'web' (localStorage) or 'local' (JSON)
        this.isGitHubPages = false;
        
        this.init();
    }

    async init() {
        console.log('Starting init...');
        this.detectEnvironment();
        await this.loadData();
        this.bindEvents();
        console.log('About to render after init, decks:', this.decks.length);
        this.render();
        this.updateFilters();
        console.log('Init complete');
    }

    // Detect if running locally or on GitHub Pages
    detectEnvironment() {
        this.isLocal = window.location.protocol === 'file:' || 
                      window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
        
        this.isGitHubPages = window.location.hostname === 'vandalit.github.io';
        
        // Initialize storage mode and UI
        this.initializeStorageMode();
    }

    initializeStorageMode() {
        // Default to web mode
        this.storageMode = 'web';
        
        // Update UI elements
        this.updateStorageChip();
        this.updateToggleState();
    }

    updateStorageChip() {
        const chip = document.getElementById('storageChip');
        if (chip) {
            chip.textContent = this.storageMode === 'web' ? 'Web' : 'Local';
            chip.className = `storage-chip ${this.storageMode}`;
        }
    }

    updateToggleState() {
        const toggle = document.getElementById('storageToggle');
        if (toggle) {
            toggle.checked = this.storageMode === 'local';
        }
    }

    // Event Binding
    bindEvents() {
        // Header actions
        document.getElementById('createDeckBtn').addEventListener('click', () => this.showDeckModal());
        document.getElementById('dataMenuBtn').addEventListener('click', () => this.toggleDataMenu());
        
        // Data menu actions
        document.getElementById('exportBtn').addEventListener('click', () => this.exportToCSV());
        document.getElementById('importBtn').addEventListener('click', () => this.importFromCSV());
        document.getElementById('clearDataBtn').addEventListener('click', () => this.clearData());
        
        // Storage toggle
        const storageToggle = document.getElementById('storageToggle');
        if (storageToggle) {
            storageToggle.addEventListener('change', (e) => this.handleStorageToggle(e));
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
        document.getElementById('editDetailBtn').addEventListener('click', () => this.editFromDetail());
        document.getElementById('deleteDetailBtn').addEventListener('click', () => this.deleteFromDetail());
        
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
        console.log('Loading data...');
        
        try {
            // Load from both sources for initial verification
            const localStorageData = await this.loadFromLocalStorage();
            const jsonData = await this.loadFromJSON();
            
            console.log('LocalStorage data:', localStorageData);
            console.log('JSON data:', jsonData);
            
            // If localStorage is empty but JSON has data, load JSON to localStorage (initialization)
            if (!localStorageData && jsonData) {
                console.log('Initializing with JSON data');
                this.decks = jsonData.decks || [];
                this.updateCategoriesAndHashtags();
                // Save to localStorage for future use
                this.saveData();
                this.render();
                this.updateFilters();
                console.log('Data initialized and saved to localStorage');
                return;
            }
            
            // If we have data from both sources, use localStorage by default
            if (localStorageData && jsonData && this.isLocal) {
                console.log('Both sources have data, using localStorage');
                this.decks = localStorageData.decks || [];
                this.updateCategoriesAndHashtags();
                this.render();
                this.updateFilters();
                console.log('localStorage data loaded, decks count:', this.decks.length);
                return;
            }
            
            // Use localStorage data if available
            if (localStorageData) {
                console.log('Using localStorage data');
                this.decks = localStorageData.decks || [];
                this.updateCategoriesAndHashtags();
                this.render();
                this.updateFilters();
                console.log('localStorage data loaded, decks count:', this.decks.length);
                return;
            }
            
            // Default empty state
            console.log('Creating default deck');
            this.decks = [];
            this.createDefaultDeck();
            this.render();
            this.updateFilters();
            console.log('Default deck created, decks count:', this.decks.length);
        } catch (error) {
            console.error('Error in loadData:', error);
            this.decks = [];
            this.createDefaultDeck();
            this.render();
            this.updateFilters();
        }
    }

    async loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('cardsBacklog');
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading localStorage data:', error);
        }
        return null;
    }

    async loadFromJSON() {
        try {
            console.log('Attempting to fetch data.json...');
            const response = await fetch('./data.json');
            console.log('Fetch response:', response.status, response.statusText);
            if (response.ok) {
                const data = await response.json();
                console.log('JSON data loaded successfully:', data);
                return data;
            }
        } catch (error) {
            console.error('Error loading data.json:', error);
        }
        return null;
    }

    saveData() {
        const data = {
            decks: this.decks,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem('cardsBacklog', JSON.stringify(data));
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
                        this.allHashtags.add(tag.toLowerCase());
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
            document.getElementById('cardImages').value = card.images ? card.images.join(', ') : '';
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
        const imageString = document.getElementById('cardImages').value.trim();
        
        if (!title) return;
        
        const hashtags = this.parseHashtags(hashtagString);
        const images = this.parseImages(imageString);
        
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
            card.images = images;
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
                images,
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
    }

    // Detail Modal Management
    showDetailModal(deckId, card) {
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
        if (card.images && card.images.length > 0) {
            imagesElement.innerHTML = card.images
                .map(img => `<img src="${img}" alt="Card image" class="detail-image" onerror="this.style.display='none'">`)
                .join('');
            imagesField.style.display = 'block';
        } else {
            imagesField.style.display = 'none';
        }
    }

    editFromDetail() {
        if (this.currentDetailCard) {
            this.hideDetailModal();
            this.showCardModal(this.currentDetailCard.deckId, this.currentDetailCard.card);
        }
    }

    deleteFromDetail() {
        if (this.currentDetailCard) {
            this.hideDetailModal();
            this.deleteCard(this.currentDetailCard.deckId, this.currentDetailCard.card.id);
        }
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
        console.log('Rendering with decks:', this.decks.length);
        const container = document.getElementById('decksContainer');
        if (!container) {
            console.error('decksContainer not found!');
            return;
        }
        
        container.innerHTML = '';
        
        if (this.decks.length === 0) {
            console.log('No decks, rendering empty state');
            this.renderEmptyState(container);
            return;
        }
        
        console.log('Rendering decks...');
        this.decks.forEach(deck => {
            console.log('Creating deck element for:', deck.name);
            const deckElement = this.createDeckElement(deck);
            container.appendChild(deckElement);
        });
        console.log('Render complete');
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
        deckDiv.className = 'deck';
        deckDiv.innerHTML = `
            <div class="deck-header">
                <div>
                    <div class="deck-title">${deck.name}</div>
                    <div class="deck-description">${deck.description || ''}</div>
                </div>
                <div class="deck-actions">
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
        
        return deckDiv;
    }

    createCardHTML(card, deckId) {
        const categoryHTML = card.category ? `<div class="card-category">${card.category}</div>` : '';
        const hashtagsHTML = card.hashtags && card.hashtags.length > 0 
            ? `<div class="card-hashtags">${card.hashtags.map(tag => `<span class="hashtag">#${tag}</span>`).join('')}</div>`
            : '';
        const imagesHTML = card.images && card.images.length > 0
            ? `<div class="card-images">${card.images.slice(0, 3).map(img => `<img src="${img}" alt="Card image" class="card-image" onerror="this.style.display='none'">`).join('')}</div>`
            : '';
        
        return `
            <div class="card" draggable="true" data-card-id="${card.id}" data-deck-id="${deckId}" onclick="app.showDetailModal('${deckId}', app.decks.find(d => d.id === '${deckId}').cards.find(c => c.id === '${card.id}'))">
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

    // Drag and Drop
    addDragAndDropToCards(deckElement, deckId) {
        const cards = deckElement.querySelectorAll('.card');
        const cardsGrid = deckElement.querySelector('.cards-grid');
        
        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    cardId: card.dataset.cardId,
                    fromDeckId: card.dataset.deckId
                }));
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        });
        
        cardsGrid.addEventListener('dragover', (e) => {
            e.preventDefault();
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
                this.moveCard(data.cardId, data.fromDeckId, deckId);
            } catch (error) {
                console.error('Error moving card:', error);
            }
        });
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

    // Handle storage mode toggle
    handleStorageToggle(e) {
        const newMode = e.target.checked ? 'local' : 'web';
        
        // Check if trying to switch to local mode on GitHub Pages
        if (newMode === 'local' && this.isGitHubPages) {
            alert('El modo Local no está disponible en GitHub Pages. Descarga la aplicación para usar esta función.');
            e.target.checked = false;
            return;
        }
        
        // Check if trying to switch to local mode without local environment
        if (newMode === 'local' && !this.isLocal) {
            alert('El modo Local solo está disponible cuando ejecutas la aplicación localmente.');
            e.target.checked = false;
            return;
        }
        
        this.switchStorageMode(newMode);
    }

    async switchStorageMode(newMode) {
        const currentData = this.getCurrentData();
        const targetData = newMode === 'local' ? await this.loadFromJSON() : await this.loadFromLocalStorage();
        
        // Show migration dialog
        this.showStorageMigrationDialog(currentData, targetData, newMode);
    }

    getCurrentData() {
        return {
            decks: this.decks,
            lastModified: new Date().toISOString(),
            version: "1.0.0"
        };
    }

    showDataMigrationDialog(localStorageData, jsonData) {
        // Use localStorage data as default for initial load
        this.decks = localStorageData.decks || [];
        this.updateCategoriesAndHashtags();
        this.render();
        this.updateFilters();
        console.log('Using localStorage data for initial load');
    }

    renderDataTable(data) {
        if (!data || !data.decks || data.decks.length === 0) {
            return '<p class="no-data">Sin datos</p>';
        }
        
        let html = '<table class="migration-table"><thead><tr><th>Deck</th><th>Cards</th><th>Última Modificación</th></tr></thead><tbody>';
        
        data.decks.forEach(deck => {
            html += `
                <tr>
                    <td>${deck.name}</td>
                    <td>${deck.cards ? deck.cards.length : 0}</td>
                    <td>${new Date(deck.createdAt).toLocaleDateString()}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        return html;
    }

    performMigration(data, newMode) {
        this.storageMode = newMode;
        this.decks = data.decks || [];
        
        // Save to new storage mode
        if (newMode === 'web') {
            this.saveToLocalStorage();
        } else {
            this.saveToJSON();
        }
        
        this.updateStorageChip();
        this.updateCategoriesAndHashtags();
        this.render();
        this.updateFilters();
        
        alert(`Datos migrados exitosamente al modo ${newMode === 'web' ? 'Web' : 'Local'}.`);
    }

    saveToLocalStorage() {
        const data = {
            decks: this.decks,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem('cardsBacklog', JSON.stringify(data));
    }

    saveToJSON() {
        if (!this.isLocal) {
            alert('No se puede escribir en JSON desde el navegador.');
            return;
        }
        
        const data = {
            decks: this.decks,
            lastModified: new Date().toISOString(),
            version: "1.0.0"
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Archivo data.json actualizado. Reemplaza el archivo en la raíz del proyecto.');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    const app = new IdeaDeckManager();
});
