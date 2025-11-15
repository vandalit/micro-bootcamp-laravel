// Mock data for PAES admission system

// Student database with PAES scores and personal information
const studentsDB = {
    "12.345.678-9": {
        name: "María González Pérez",
        rut: "12.345.678-9",
        password: "demo123",
        paesScore: 720,
        email: "maria.gonzalez@email.com",
        phone: "+56 9 8765 4321"
    },
    "98.765.432-1": {
        name: "Carlos Rodríguez Silva",
        rut: "98.765.432-1",
        password: "demo456",
        paesScore: 650,
        email: "carlos.rodriguez@email.com",
        phone: "+56 9 1234 5678"
    },
    "11.222.333-4": {
        name: "Ana Martínez López",
        rut: "11.222.333-4",
        password: "demo789",
        paesScore: 580,
        email: "ana.martinez@email.com",
        phone: "+56 9 9876 5432"
    }
};

// University departments
const departments = {
    "ingenieria": "Facultad de Ingeniería",
    "medicina": "Facultad de Medicina",
    "derecho": "Facultad de Derecho",
    "economia": "Facultad de Economía y Negocios",
    "educacion": "Facultad de Educación",
    "ciencias": "Facultad de Ciencias",
    "artes": "Facultad de Artes y Humanidades",
    "psicologia": "Facultad de Psicología"
};

// Career database with detailed information
const careersDB = [
    {
        id: "ing-civil",
        name: "Ingeniería Civil",
        department: "ingenieria",
        description: "Formamos profesionales capaces de diseñar, construir y mantener infraestructuras que mejoren la calidad de vida de las personas. Nuestros egresados trabajan en proyectos de construcción, transporte, recursos hídricos y estructuras.",
        duration: "6 años",
        minScore: 650,
        maxStudents: 120,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Cálculo I", "Álgebra Lineal", "Física I", "Química General", "Introducción a la Ingeniería"]
            },
            {
                semester: "2° Semestre", 
                subjects: ["Cálculo II", "Física II", "Programación", "Dibujo Técnico", "Estática"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Cálculo III", "Ecuaciones Diferenciales", "Mecánica de Fluidos", "Resistencia de Materiales", "Topografía"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Análisis Estructural", "Hidráulica", "Geotecnia", "Materiales de Construcción", "Estadística"]
            }
        ]
    },
    {
        id: "medicina",
        name: "Medicina",
        department: "medicina",
        description: "Carrera orientada a formar médicos integrales con sólidos conocimientos científicos, habilidades clínicas y compromiso social. Nuestros estudiantes desarrollan competencias para el diagnóstico, tratamiento y prevención de enfermedades.",
        duration: "7 años",
        minScore: 750,
        maxStudents: 80,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Anatomía I", "Biología Celular", "Química Orgánica", "Bioestadística", "Introducción a la Medicina"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Anatomía II", "Fisiología I", "Bioquímica", "Histología", "Embriología"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Fisiología II", "Microbiología", "Inmunología", "Farmacología I", "Patología General"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Semiología", "Farmacología II", "Patología Sistémica", "Medicina Interna I", "Ética Médica"]
            }
        ]
    },
    {
        id: "derecho",
        name: "Derecho",
        department: "derecho",
        description: "Formamos abogados con sólida preparación jurídica, ética profesional y compromiso con la justicia. Nuestros egresados se desempeñan en diversas áreas del derecho público y privado.",
        duration: "5 años",
        minScore: 600,
        maxStudents: 150,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Introducción al Derecho", "Historia del Derecho", "Teoría del Estado", "Economía", "Metodología Jurídica"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Derecho Civil I", "Derecho Constitucional", "Derecho Romano", "Filosofía del Derecho", "Inglés Jurídico"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Derecho Civil II", "Derecho Penal I", "Derecho Administrativo", "Derecho Internacional", "Argumentación Jurídica"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Derecho Civil III", "Derecho Penal II", "Derecho Comercial", "Derecho Laboral", "Práctica Procesal"]
            }
        ]
    },
    {
        id: "psicologia",
        name: "Psicología",
        department: "psicologia",
        description: "Carrera que forma profesionales capaces de comprender y abordar los procesos mentales y comportamentales humanos. Nuestros egresados trabajan en áreas clínica, educacional, organizacional y social.",
        duration: "5 años",
        minScore: 580,
        maxStudents: 100,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Introducción a la Psicología", "Biología", "Estadística I", "Filosofía", "Metodología de la Investigación"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Psicología del Desarrollo", "Neuropsicología", "Estadística II", "Psicología Social", "Teorías de la Personalidad"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Psicología Cognitiva", "Psicopatología", "Psicología Experimental", "Psicología Educacional", "Ética Profesional"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Evaluación Psicológica", "Psicoterapia", "Psicología Organizacional", "Psicología Comunitaria", "Práctica I"]
            }
        ]
    },
    {
        id: "ing-informatica",
        name: "Ingeniería en Informática",
        department: "ingenieria",
        description: "Formamos profesionales especializados en el desarrollo de software, sistemas de información y tecnologías emergentes. Nuestros egresados lideran la transformación digital en diversas industrias.",
        duration: "5 años",
        minScore: 620,
        maxStudents: 140,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Programación I", "Matemática Discreta", "Cálculo I", "Introducción a la Informática", "Inglés Técnico"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Programación II", "Estructuras de Datos", "Cálculo II", "Física", "Álgebra Lineal"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Algoritmos", "Base de Datos", "Arquitectura de Computadores", "Estadística", "Ingeniería de Software I"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Sistemas Operativos", "Redes de Computadores", "Ingeniería de Software II", "Inteligencia Artificial", "Proyecto I"]
            }
        ]
    },
    {
        id: "administracion",
        name: "Administración de Empresas",
        department: "economia",
        description: "Carrera que forma líderes empresariales con visión estratégica y habilidades gerenciales. Nuestros egresados se desempeñan en gestión, consultoría y emprendimiento en diversos sectores económicos.",
        duration: "4 años",
        minScore: 550,
        maxStudents: 180,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Introducción a la Administración", "Matemática I", "Economía I", "Contabilidad I", "Comunicación Empresarial"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Administración de Recursos Humanos", "Matemática II", "Economía II", "Contabilidad II", "Marketing I"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Finanzas I", "Estadística", "Investigación de Mercados", "Marketing II", "Comportamiento Organizacional"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Finanzas II", "Estrategia Empresarial", "Gestión de Operaciones", "Emprendimiento", "Proyecto Final"]
            }
        ]
    },
    {
        id: "educacion-basica",
        name: "Pedagogía en Educación Básica",
        department: "educacion",
        description: "Formamos educadores comprometidos con el desarrollo integral de niños y niñas. Nuestros egresados poseen sólidas competencias pedagógicas y disciplinarias para la enseñanza básica.",
        duration: "4 años",
        minScore: 500,
        maxStudents: 120,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Fundamentos de la Educación", "Psicología del Desarrollo", "Matemática para Profesores", "Lenguaje y Comunicación", "Práctica I"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Didáctica General", "Psicología del Aprendizaje", "Ciencias Naturales", "Historia y Geografía", "Práctica II"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Evaluación Educacional", "Necesidades Educativas Especiales", "Artes y Educación Física", "Tecnología Educativa", "Práctica III"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Gestión Educacional", "Investigación Educativa", "Ética Profesional", "Práctica Profesional", "Seminario de Título"]
            }
        ]
    },
    {
        id: "biologia",
        name: "Biología",
        department: "ciencias",
        description: "Carrera científica que estudia los seres vivos y sus procesos vitales. Nuestros egresados se especializan en investigación, conservación, biotecnología y educación científica.",
        duration: "5 años",
        minScore: 590,
        maxStudents: 60,
        curriculum: [
            {
                semester: "1° Semestre",
                subjects: ["Biología General", "Química General", "Matemática", "Física", "Metodología Científica"]
            },
            {
                semester: "2° Semestre",
                subjects: ["Biología Celular", "Química Orgánica", "Estadística", "Botánica", "Zoología"]
            },
            {
                semester: "3° Semestre",
                subjects: ["Genética", "Bioquímica", "Ecología", "Microbiología", "Evolución"]
            },
            {
                semester: "4° Semestre",
                subjects: ["Biología Molecular", "Fisiología", "Biotecnología", "Investigación I", "Bioética"]
            }
        ]
    }
];

// Scholarship calculation based on PAES score
function calculateScholarship(paesScore) {
    if (paesScore >= 750) return 100;
    if (paesScore >= 700) return 80;
    if (paesScore >= 650) return 60;
    if (paesScore >= 600) return 40;
    if (paesScore >= 550) return 25;
    if (paesScore >= 500) return 15;
    return 0;
}

// Check if student is eligible for a career
function isEligible(studentScore, careerMinScore) {
    return studentScore >= careerMinScore;
}
