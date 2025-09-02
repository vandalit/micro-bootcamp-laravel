# Bootcamp Flashcards SCI · Laravel + Angular

## Índice Completo del Proyecto Educativo

### 1. **Introducción**

- 1.1 Motivación y objetivos del bootcamp
- 1.2 Arquitectura general (SPA + API REST)
- 1.3 Tecnologías elegidas y justificación
- 1.4 Flujo de aprendizaje por hitos
- 1.5 Metodología: TDD y desarrollo incremental

### 2. **Entorno de desarrollo**

- 2.1 Requisitos de software (PHP ≥ 8.3, Composer, Node ≥ 20, Git)
- 2.2 Instalación de Laravel 11 y proyecto `api/`
- 2.3 Instalación de Angular CLI 17 y scaffold `web/`
- 2.4 Base de datos SQLite: configuración rápida
- 2.5 Extensiones VS Code y herramientas de desarrollo
- 2.6 Scripts de desarrollo y automatización

### 3. **Análisis y diseño del proyecto**

- 3.1 Especificación de requisitos funcionales detallada

- 3.2 Casos de uso y user stories con criterios de aceptación

- 3.3  Arquitectura de base de datos completa

  (Ver documento técnico adjunto)

  - 3.3.1 Análisis de entidades y relaciones
  - 3.3.2 Diagrama ERD con notación crow's foot
  - 3.3.3 Diccionario de datos exhaustivo (6 tablas principales)
  - 3.3.4 Normalización y optimizaciones de performance
  - 3.3.5 Índices estratégicos y constraints de integridad
  - 3.3.6 Estrategias de migración y versionado
  - 3.3.7 Datos de prueba y factories patterns

- 3.4 

  Diseño de API REST

  - 3.4.1 Especificación OpenAPI/Swagger completa
  - 3.4.2 Contratos de endpoints y payloads
  - 3.4.3 Códigos de estado HTTP y manejo de errores
  - 3.4.4 Versionado de API y compatibilidad

- 3.5 

  Arquitectura del sistema

  - 3.5.1 Diagramas de arquitectura (C4 Model)
  - 3.5.2 Flujo de datos y estados
  - 3.5.3 Security architecture (dual auth flows)

- 3.6 

  Diseño de interfaz y experiencia

  - 3.6.1 Wireframes de alta fidelidad
  - 3.6.2 Prototipo interactivo (Figma/Adobe XD)
  - 3.6.3 Design system y componentes reutilizables
  - 3.6.4 Responsive breakpoints y accessibility

- 3.7 

  Arquitectura de componentes Angular

  - 3.7.1 Estructura de módulos y lazy-loading
  - 3.7.2 Jerarquía de componentes y comunicación
  - 3.7.3 Servicios y gestión de estado
  - 3.7.4 Patrones: Container/Presentational, Facade

- 3.8 **Patrones de diseño y principios SOLID aplicados**

### 4. **Fundamentos Laravel (Backend)**

- 4.1 

  Estructura de proyecto y convenciones

  - 4.1.1 Arquitectura MVC y principios SOLID
  - 4.1.2 Organización de carpetas y namespaces
  - 4.1.3 Convenciones de nomenclatura Laravel

- 4.2 

  Ciclo de vida de Request en Laravel

  - 4.2.1 Request→Middleware→Route→Controller→Response
  - 4.2.2 Service Container e Inyección de Dependencias
  - 4.2.3 Facades vs Dependency Injection

- 4.3 

  Implementación del modelo de datos

  - 4.3.1 Migrations: creación y versionado
  - 4.3.2 Eloquent ORM: modelos y relaciones
  - 4.3.3 Mutators, Accessors y Cast Types
  - 4.3.4 Scopes locales y globales
  - 4.3.5 Model Events y Observers

- 4.4 

  Datos de prueba y desarrollo

  - 4.4.1 Seeders: datos iniciales y de desarrollo
  - 4.4.2 Factories: generación de datos faker
  - 4.4.3 Database Transactions en tests

- 4.5 

  Construcción de API REST

  - 4.5.1 Resource Controllers y rutas automáticas
  - 4.5.2 Route Model Binding implícito y explícito
  - 4.5.3 Nested Resources y sub-recursos

- 4.6 

  Validación robusta de datos

  - 4.6.1 Form Request Classes y reglas personalizadas
  - 4.6.2 Validación condicional y compleja
  - 4.6.3 Mensajes de error personalizados

- 4.7 

  Serialización y transformación de datos

  - 4.7.1 API Resources: simple y collection
  - 4.7.2 Resource Relationships y lazy loading
  - 4.7.3 Conditional Attributes y meta-datos

- 4.8 

  Middleware y manejo transversal

  - 4.8.1 Middleware personalizado para logging/audit
  - 4.8.2 CORS configuration y preflight
  - 4.8.3 Rate limiting y throttling

### 5. **Fundamentos Angular (Frontend)**

- 5.1 

  Anatomía del workspace Angular

  - 5.1.1 Estructura de carpetas y archivos clave
  - 5.1.2 Configuración de environments
  - 5.1.3 angular.json y build configurations

- 5.2 

  Módulos y arquitectura escalable

  - 5.2.1 Feature modules y shared modules
  - 5.2.2 Lazy-loading strategies
  - 5.2.3 Barrel exports y organización

- 5.3 

  Routing y navegación avanzada

  - 5.3.1 Nested routes y child routes
  - 5.3.2 Route guards y resolvers
  - 5.3.3 Route parameters y query params

- 5.4 

  Servicios e inyección de dependencias

  - 5.4.1 Singleton services y providedIn
  - 5.4.2 Multi-provider patterns
  - 5.4.3 Injection tokens y forRoot pattern

- 5.5 

  HttpClient y consumo de APIs

  - 5.5.1 HTTP interceptors avanzados
  - 5.5.2 Error handling y retry strategies
  - 5.5.3 Caching y offline support

- 5.6 

  Reactive Forms y validación

  - 5.6.1 FormBuilder y form arrays
  - 5.6.2 Custom validators y async validation
  - 5.6.3 Dynamic forms y conditional fields

- 5.7 

  Gestión de estado con RxJS

  - 5.7.1 Observables patterns y operators
  - 5.7.2 Subject types y communication
  - 5.7.3 Memory leak prevention

- 5.8 

  Performance y optimización

  - 5.8.1 OnPush change detection
  - 5.8.2 TrackBy functions y virtual scrolling
  - 5.8.3 Preloading strategies

### 6. **Sistema de autenticación**

- 6.1 Laravel Sanctum: setup y configuración
- 6.2 Modelos User, Institution y relaciones
- 6.3 Google OAuth con Laravel Socialite
- 6.4 Autenticación institucional personalizada
- 6.5 Guards y protección de rutas en Angular
- 6.6 Interceptores para tokens automáticos
- 6.7 Manejo de sesiones y logout

### 7. **Integración full-stack**

- 7.1 Desarrollo de endpoints CRUD `/api/flashcards`
- 7.2 Validación avanzada y reglas de negocio
- 7.3 Paginación y filtros de búsqueda
- 7.4 Consumo desde Angular con tipado TypeScript
- 7.5 Manejo de estados: loading, error, success
- 7.6 Optimizaciones: caching y lazy loading
- 7.7 Políticas CORS y proxy de desarrollo

### 8. **Diseño e interfaz de usuario**

- 8.1 Sistema de diseño con Tailwind CSS
- 8.2 Layout responsive y componentes base
- 8.3 Componente `auth-toggle` (Google vs Institucional)
- 8.4 Componente `flashcard-grid` (Bento layout)
- 8.5 Componente `flashcard-item` (display y interacción)
- 8.6 Componente `flashcard-form` (modal de creación)
- 8.7 Componente `user-dashboard` (navbar y perfil)
- 8.8 Estados de carga y feedback visual
- 8.9 Animaciones y micro-interacciones

### 9. **Testing y calidad de código**

- 9.1 

  Filosofía TDD y mejores prácticas

  - 9.1.1 Red-Green-Refactor cycle
  - 9.1.2 Test pyramid y testing strategies
  - 9.1.3 Mocking y test doubles

- 9.2 

  Testing en Laravel

  - 9.2.1 Feature tests para autenticación dual
  - 9.2.2 Unit tests para modelos y servicios
  - 9.2.3 Database testing y transactions
  - 9.2.4 API testing con JSON assertions

- 9.3 

  Testing en Angular

  - 9.3.1 Component testing con TestBed
  - 9.3.2 Service testing y HTTP mocking
  - 9.3.3 Form validation testing
  - 9.3.4 Router testing y navigation

- 9.4 

  End-to-End testing

  - 9.4.1 Cypress setup y configuration
  - 9.4.2 User journey testing
  - 9.4.3 Cross-browser testing

- 9.5 

  Code quality y análisis estático

  - 9.5.1 ESLint y PHP CS Fixer rules
  - 9.5.2 SonarQube integration
  - 9.5.3 Code coverage reporting

- 9.6 

  CI/CD y automation

  - 9.6.1 GitHub Actions workflows
  - 9.6.2 Pre-commit hooks con Husky
  - 9.6.3 Automated deployments

### 10. **Control de versiones y colaboración**

- 10.1 

  Git workflow enterprise

  - 10.1.1 GitFlow vs GitHub Flow
  - 10.1.2 Branch naming conventions
  - 10.1.3 Merge vs rebase strategies

- 10.2 

  Conventional Commits y semantic versioning

  - 10.2.1 Commit message standards
  - 10.2.2 Automated changelog generation
  - 10.2.3 Release management

- 10.3 

  Code review y collaboration

  - 10.3.1 Pull request templates
  - 10.3.2 Code review checklists
  - 10.3.3 Conflict resolution strategies

- 10.4 

  Documentation as code

  - 10.4.1 README-driven development
  - 10.4.2 API documentation automation
  - 10.4.3 Architecture decision records

### 11. **Deployment y DevOps**

- 11.1 

  Production build optimization

  - 11.1.1 Laravel production optimizations
  - 11.1.2 Angular build configurations
  - 11.1.3 Asset optimization y compression

- 11.2 

  Environment management

  - 11.2.1 Configuration management
  - 11.2.2 Secrets management
  - 11.2.3 Environment parity

- 11.3 

  Hosting y infrastructure

  - 11.3.1 Frontend hosting (Vercel/Netlify)
  - 11.3.2 Backend hosting (Railway/Heroku)
  - 11.3.3 Database hosting y backups

- 11.4 

  Monitoring y observability

  - 11.4.1 Application monitoring
  - 11.4.2 Error tracking y alerting
  - 11.4.3 Performance metrics

### 12. **Recursos de aprendizaje consolidados**

- 12.1 

  Documentación oficial y referencias

  - 12.1.1 Laravel ecosystem (laravel.com, packages)
  - 12.1.2 Angular documentation y style guide
  - 12.1.3 TypeScript handbook y best practices

- 12.2 

  Cursos estructurados recomendados

  - 12.2.1 Laracasts: "Laravel From Scratch" + "Testing Laravel"
  - 12.2.2 Angular University: "RxJS" + "Angular Forms"
  - 12.2.3 Traversy Media: Full-Stack development series

- 12.3 

  Libros técnicos de referencia

  - 12.3.1 "Laravel: Up & Running" (Matt Stauffer)
  - 12.3.2 "ng-book: Angular" (Fullstack.io)
  - 12.3.3 "Clean Code" + "Clean Architecture" (Robert Martin)

- 12.4 

  Comunidades y networking

  - 12.4.1 Laravel community (Slack, Discord, forums)
  - 12.4.2 Angular community y meetups
  - 12.4.3 Stack Overflow y Reddit communities

- 12.5 

  Herramientas y utilidades

  - 12.5.1 Development tools y extensions
  - 12.5.2 Debugging y profiling tools
  - 12.5.3 Design y prototyping tools

- 12.6 

  Referencias rápidas integradas

  - 12.6.1 Ver Apéndice 18.3 para comandos
  - 12.6.2 Ver Apéndice 18.5 para code templates
  - 12.6.3 Ver Sección 15 para documentación técnica

### 13. **Ejercicios prácticos y desafíos**

- 13.1 Challenges progresivos por módulo
- 13.2 Proyectos mini para practicar conceptos
- 13.3 Code reviews grupales
- 13.4 Refactoring challenges
- 13.5 Performance optimization tasks
- 13.6 Bug hunting exercises

### 14. **Próximos pasos y extensiones**

- 14.1 Funcionalidades avanzadas:
  - Sistema de etiquetas y categorías
  - Comentarios y colaboración
  - Gamificación y progreso
  - Modo estudio con repetición espaciada
- 14.2 Optimizaciones técnicas:
  - Server-side rendering (Angular Universal)
  - Progressive Web App (PWA)
  - Dockerización completa
  - Microservicios
- 14.3 Integraciones externas:
  - APIs de terceros (Wikipedia, Google Translate)
  - Webhooks y notificaciones
  - Analytics y métricas de uso
- 14.4 Escalabilidad:
  - Cache Redis
  - Load balancing
  - CDN para assets

### 15. **Documentación técnica y mantenimiento**

- 15.1 

  Documentación de base de datos

  - 15.1.1 Diccionario de datos exhaustivo
  - 15.1.2 Diagramas ERD actualizados
  - 15.1.3 Scripts de migración documentados
  - 15.1.4 Procedures y triggers (si aplica)

- 15.2 

  Documentación de API

  - 15.2.1 OpenAPI/Swagger specs actualizadas
  - 15.2.2 Postman collections con ejemplos
  - 15.2.3 SDK documentation para consumo

- 15.3 

  Documentación de código

  - 15.3.1 PHPDoc standards en Laravel
  - 15.3.2 TSDoc standards en Angular
  - 15.3.3 README files por módulo

- 15.4 

  Runbooks operacionales

  - 15.4.1 Procedimientos de deployment
  - 15.4.2 Troubleshooting común
  - 15.4.3 Rollback procedures
  - 15.4.4 Monitoring y alerting setup

- 15.5 **Architecture Decision Records (ADRs)**

- 15.6 **Change logs y release notes**

### 16. **Performance y optimización**

- 16.1 

  Optimización de base de datos

  - 16.1.1 Query optimization y explain plans
  - 16.1.2 Índices estratégicos y composite indexes
  - 16.1.3 Database connection pooling
  - 16.1.4 Caching strategies (Redis/Memcached)

- 16.2 

  Optimización del backend

  - 16.2.1 Laravel performance best practices
  - 16.2.2 Eager loading y N+1 problem solutions
  - 16.2.3 Queue jobs para tareas pesadas
  - 16.2.4 API rate limiting y throttling

- 16.3 

  Optimización del frontend

  - 16.3.1 Angular performance patterns
  - 16.3.2 Lazy loading y code splitting
  - 16.3.3 OnPush change detection strategy
  - 16.3.4 Bundle optimization y tree shaking

- 16.4 

  Monitoring y métricas

  - 16.4.1 Application Performance Monitoring (APM)
  - 16.4.2 Error tracking (Sentry/Bugsnag)
  - 16.4.3 User analytics y behavior tracking
  - 16.4.4 Performance budgets y alerting

### 17. **Seguridad avanzada**

- 17.1 

  Security by design

  - 17.1.1 OWASP Top 10 prevention
  - 17.1.2 Input validation y sanitization
  - 17.1.3 SQL injection prevention
  - 17.1.4 XSS y CSRF protection

- 17.2 

  Authentication & Authorization

  - 17.2.1 JWT best practices
  - 17.2.2 OAuth 2.0 y OpenID Connect
  - 17.2.3 Role-based access control (RBAC)
  - 17.2.4 Multi-factor authentication (MFA)

- 17.3 

  Data protection

  - 17.3.1 Encryption at rest y in transit
  - 17.3.2 PII data handling y GDPR compliance
  - 17.3.3 Secure file uploads y storage
  - 17.3.4 Database encryption y sensitive data masking

- 17.4 

  Security testing

  - 17.4.1 Penetration testing básico
  - 17.4.2 Vulnerability scanning
  - 17.4.3 Security code review checklist
  - 17.4.4 Dependency vulnerability auditing

### 18. **Apéndices técnicos**

- 18.1 

  Troubleshooting y FAQ

  - 18.1.1 Problemas comunes de instalación
  - 18.1.2 Errores de configuración frecuentes
  - 18.1.3 Debug techniques y logging
  - 18.1.4 Performance troubleshooting

- 18.2 

  Glosario técnico completo

  - 18.2.1 Términos de Laravel y PHP
  - 18.2.2 Términos de Angular y TypeScript
  - 18.2.3 Conceptos de base de datos
  - 18.2.4 Términos de arquitectura y DevOps

- 18.3 

  Comandos útiles y snippets

  - 18.3.1 Artisan commands cheat sheet
  - 18.3.2 Angular CLI commands reference
  - 18.3.3 Database management scripts
  - 18.3.4 Git workflow commands

- 18.4 

  Configuraciones de editores

  - 18.4.1 VS Code settings y extensiones
  - 18.4.2 PhpStorm/WebStorm configurations
  - 18.4.3 Vim/Neovim setup para full-stack
  - 18.4.4 Code formatting y linting configs

- 18.5 

  Templates de código reutilizable

  - 18.5.1 Laravel boilerplate components
  - 18.5.2 Angular common patterns
  - 18.5.3 Database migration templates
  - 18.5.4 Testing utilities y mocks

- 18.6 

  Recursos externos y referencias

  - 18.6.1 Links a documentación oficial
  - 18.6.2 Comunidades y foros recomendados
  - 18.6.3 Libros y cursos complementarios
  - 18.6.4 Tools y servicios útiles

------

## 🎯 **Objetivos de aprendizaje detallados por sección:**

### **🔧 Técnicos (Hard Skills):**

#### **Backend Development:**

- ✅ Dominio completo de Laravel 11 y ecosystem
- ✅ Diseño de APIs RESTful robustas y escalables
- ✅ Implementación de patrones de diseño (Repository, Service Layer)
- ✅ Testing comprehensivo (Unit, Feature, Integration)
- ✅ Database design y performance optimization
- ✅ Security best practices y OWASP compliance

#### **Frontend Development:**

- ✅ Maestría en Angular 17+ y TypeScript
- ✅ Reactive programming con RxJS
- ✅ State management patterns y arquitectura escalable
- ✅ Performance optimization y best practices
- ✅ Responsive design y accessibility compliance
- ✅ Testing de componentes y E2E

#### **Full-Stack Integration:**

- ✅ API design y contract-first development
- ✅ Authentication flows y security implementation
- ✅ Error handling y user experience optimization
- ✅ Performance monitoring y optimization
- ✅ DevOps basics y deployment strategies

### **🧠 Soft Skills:**

- ✅ **Problem-solving sistemático** - Debugging metodológico y root cause analysis
- ✅ **Code review efectivo** - Constructive feedback y knowledge sharing
- ✅ **Documentación técnica clara** - Writing for different audiences
- ✅ **Trabajo colaborativo** - Git workflows y team coordination
- ✅ **Continuous learning** - Staying updated con technology trends
- ✅ **Project management básico** - Task estimation y priority management

### **💼 Profesionales (Career Skills):**

- ✅ **Portfolio completo** - Production-ready project showcase
- ✅ **Industry experience simulation** - Real-world development practices
- ✅ **Technical communication** - Explaining complex concepts clearly
- ✅ **Interview preparation** - Technical questions y live coding skills
- ✅ **Networking foundation** - Community engagement y professional presence
- ✅ **Entrepreneurial mindset** - Understanding business value of technology

------

## 📈 **Criterios de evaluación y métricas de éxito:**

### **🎯 Knowledge Checkpoints:**

#### **Nivel Básico (Semanas 1-4):**

- [ ] Configurar environment de desarrollo completo
- [ ] Crear migrations y seeders funcionales
- [ ] Implementar CRUD básico en Laravel
- [ ] Crear componentes Angular con routing
- [ ] Integrar frontend y backend exitosamente

#### **Nivel Intermedio (Semanas 5-8):**

- [ ] Implementar autenticación completa dual
- [ ] Diseñar UI/UX profesional con Tailwind
- [ ] Escribir tests comprehensivos (>80% coverage)
- [ ] Optimizar queries y performance
- [ ] Manejar errores y edge cases elegantemente

#### **Nivel Avanzado (Semanas 9-12):**

- [ ] Deploy to production environment
- [ ] Implement monitoring y alerting
- [ ] Conduct security audit básico
- [ ] Create comprehensive documentation
- [ ] Present project professionally

### **📊 Métricas Cuantitativas:**

- **Code Quality:** >90% test coverage, <10% code duplication
- **Performance:** <2s load time, >95% uptime
- **Security:** Zero critical vulnerabilities
- **Documentation:** 100% API endpoints documented
- **User Experience:** <5% error rate, positive user feedback

### **🏆 Deliverables Finales:**

1. **Aplicación funcional deployada** con todas las features
2. **Codebase documentado** con README comprehensivos
3. **Test suite completa** con coverage reports
4. **API documentation** con Swagger/OpenAPI
5. **Presentation técnica** de 15-20 minutos
6. **Technical blog post** explicando key learnings
7. **Portfolio update** con project showcase

------

## 🗓️ **Timeline corregido (12 semanas) con dependencias:**

### **Sprint 1-2: Foundation & Design (Semanas 1-2)**

- Environment setup y tooling configuration
- **Database design completo** (Cap 3.3) - *Prerequisito crítico*
- Requirements analysis y API contract design
- Basic Laravel API scaffold
- Basic Angular application setup

### **Sprint 3-4: Core Backend (Semanas 3-4)**

- Laravel models, migrations y relationships (Cap 4.3)
- Authentication system dual implementation (Cap 6)
- CRUD operations para flashcards (Cap 7.1-7.2)
- Basic API testing setup

### **Sprint 5-6: Core Frontend (Semanas 5-6)**

- Angular components y routing architecture (Cap 5)
- UI/UX implementation con Tailwind (Cap 8)
- Frontend-Backend integration (Cap 7.3-7.7)
- Form validation y error handling

### **Sprint 7-8: Testing & Quality (Semanas 7-8)**

- Comprehensive testing suite (Cap 9)
- Security implementation y audit (Cap 17)
- Performance optimization inicial (Cap 16.2-16.3)
- Code quality improvements

### **Sprint 9-10: Production Readiness (Semanas 9-10)**

- CI/CD pipeline setup (Cap 9.6)
- Deployment configuration (Cap 11)
- Monitoring y error tracking (Cap 11.4)
- Load testing y optimization

### **Sprint 11-12: Documentation & Delivery (Semanas 11-12)**

- Technical documentation completion (Cap 15)
- Final performance tuning (Cap 16.4)
- Presentation preparation
- Portfolio integration y showcase

------

*Blueprint completo para el proyecto Flashcards SCI - v2.0* *Enfoque: Aprendizaje profundo, calidad profesional, preparación laboral* *Duración estimada: 12 semanas (150-200 horas)*