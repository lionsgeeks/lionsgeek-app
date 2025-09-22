<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->string('composition_foyer')->nullable(); // select
            $table->integer('nombre_personnes')->nullable(); // number input
            $table->integer('fratrie')->nullable(); // number input

            // 2. Situation professionnelle et revenus
            $table->string('pere_tuteur')->nullable(); // select
            $table->string('mere_tuteur')->nullable(); // select
            $table->string('revenus_mensuels')->nullable(); // select

            // 3. Logement
            $table->string('type_logement')->nullable(); // select
            $table->json('services_base')->nullable(); // multiple select (Eau, Electricité, Internet)

            // 4. Niveau d’éducation
            $table->string('education_pere')->nullable(); // select
            $table->string('education_mere')->nullable(); // select

            // 5. Autres éléments sociaux
            $table->string('aides_sociales')->nullable(); // text
            $table->json('situation_particuliere')->nullable(); // multiple select
            $table->string('lien_2m')->nullable(); // text

            // 6. Catégorie sociale (évaluateur LionsGEEK)
            $table->string('categorie_sociale')->nullable(); // select
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            //
        });
    }
};
