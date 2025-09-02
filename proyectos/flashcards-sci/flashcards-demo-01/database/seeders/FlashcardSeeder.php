<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Flashcard;
use App\Models\DomainSetting;

class FlashcardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create domain setting for UBO
        DomainSetting::create([
            'domain' => '@ubo.cl',
            'institution_name' => 'Universidad Bernardo O\'Higgins',
            'is_active' => false,
        ]);

        // Create sample flashcards
        $flashcards = [
            [
                'title' => 'Fotosíntesis',
                'category' => 'Biología',
                'description' => 'Proceso mediante el cual las plantas convierten la luz solar, agua y dióxido de carbono en glucosa y oxígeno. Es fundamental para la vida en la Tierra ya que produce el oxígeno que respiramos.',
                'link' => 'https://es.wikipedia.org/wiki/Fotos%C3%ADntesis',
                'created_by' => 'demo@ubo.cl',
            ],
            [
                'title' => 'Ley de Ohm',
                'category' => 'Física',
                'description' => 'Establece que la corriente eléctrica que circula por un conductor es directamente proporcional al voltaje aplicado e inversamente proporcional a la resistencia. Fórmula: V = I × R',
                'link' => 'https://es.wikipedia.org/wiki/Ley_de_Ohm',
                'created_by' => 'profesor@ubo.cl',
            ],
            [
                'title' => 'Enlaces Covalentes',
                'category' => 'Química',
                'description' => 'Tipo de enlace químico que se forma cuando dos átomos comparten uno o más pares de electrones. Son muy comunes en compuestos orgánicos y determinan muchas propiedades moleculares.',
                'link' => 'https://es.wikipedia.org/wiki/Enlace_covalente',
                'created_by' => 'estudiante@ubo.cl',
            ],
            [
                'title' => 'Mitosis',
                'category' => 'Biología',
                'description' => 'Proceso de división celular que resulta en dos células hijas genéticamente idénticas a la célula madre. Es esencial para el crecimiento y reparación de tejidos en organismos multicelulares.',
                'link' => 'https://es.wikipedia.org/wiki/Mitosis',
                'created_by' => 'demo@ubo.cl',
            ],
            [
                'title' => 'Teorema de Pitágoras',
                'category' => 'Matemáticas',
                'description' => 'En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos. Fórmula: a² + b² = c²',
                'link' => 'https://es.wikipedia.org/wiki/Teorema_de_Pit%C3%A1goras',
                'created_by' => 'profesor@ubo.cl',
            ],
            [
                'title' => 'Tabla Periódica',
                'category' => 'Química',
                'description' => 'Organización de todos los elementos químicos conocidos según su número atómico. Permite predecir propiedades químicas y físicas de los elementos basándose en su posición.',
                'link' => 'https://es.wikipedia.org/wiki/Tabla_peri%C3%B3dica',
                'created_by' => 'estudiante@ubo.cl',
            ],
        ];

        foreach ($flashcards as $flashcard) {
            Flashcard::create($flashcard);
        }
    }
}
