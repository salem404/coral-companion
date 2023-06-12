<?php

namespace Database\Seeders;

use App\Models\Character;
use Illuminate\Database\Seeder;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Aaliyah
        Character::create([
            "name" => "Aaliyah",
            "birthday" => "22",
            "season_id" => "1",
            "gender" => "Female",
            "occupation" => "(Ex) Military Pilot",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/f/f0/Aaliyah_icon.png/",
        ]);

        /* Agung (Not yet implemented)
        Character::create([
            "name" => "Agung",
            "gender" => "Male",
        ]);
        */

        // Alice
        Character::create([
            "name" => "Alice",
            "birthday" => "27",
            "season_id" => "4",
            "gender" => "Female",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/f/fc/Alice_icon.png/",
        ]);

        // Anne
        Character::create([
            "name" => "Anne",
            "birthday" => "24",
            "season_id" => "2",
            "gender" => "Female",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/5/5b/Anne_icon.png/",
        ]);

        // Antonio
        Character::create([
            "name" => "Antonio",
            "birthday" => "7",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Clothing store owner",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/2/2d/Antonio_icon.png/",
        ]);

        // Archie
        Character::create([
            "name" => "Archie",
            "birthday" => "24",
            "season_id" => "4",
            "gender" => "Male",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/2/2c/Archie_icon.png/",
        ]);

        /* Axel (Not yet implemented)
        Character::create([
            "name" => "Axel",
            "gender" => "Male",
        ]);
        */

        // Ben
        Character::create([
            "name" => "Ben",
            "birthday" => "22",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Merchant",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/1/15/Ben_icon.png/",
        ]);

        // Betty
        Character::create([
            "name" => "Betty",
            "birthday" => "13",
            "season_id" => "4",
            "gender" => "Female",
            "occupation" => "Retired",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/7/70/Betty_icon.png/",
        ]);

        // Bree
        Character::create([
            "name" => "Bree",
            "birthday" => "14",
            "season_id" => "3",
            "gender" => "Female",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/8/88/Bree_icon.png/",
        ]);

        // Chaem
        Character::create([
            "name" => "Chaem",
            "gender" => "Female",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/ab/Chaem_icon.png/",
        ]);

        // Charles
        Character::create([
            "name" => "Name",
            "birthday" => "4",
            "season_id" => "4",
            "gender" => "Male",
            "occupation" => "Doctor",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/2/2f/Charles_icon.png/",
        ]);

        // Chieftian
        // Concerned Monkey
        // Connor
        // Denali
        // Derek

        // Dinda
        Character::create([
            "name" => "Dinda",
            "birthday" => "21",
            "season_id" => "2",
            "gender" => "Female",
            "occupation" => "Carpenter",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/d/d4/Dinda_icon.png/",
        ]);

        // Dippa
        Character::create([
            "name" => "Dippa",
            "birthday" => "25",
            "season_id" => "3",
            "gender" => "Nonbinary",
            "occupation" => "Painter",
            "isRomanceable" => "0",
            "icon" =>
                "ichttps://static.wikia.nocookie.net/coralisland/images/6/69/Dippa_icon.png/",
        ]);

        // Eleanor
        Character::create([
            "name" => "Eleanor",
            "gender" => "Female",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/ad/Eleanor_icon.png/",
        ]);

        // Emily
        Character::create([
            "name" => "Emily",
            "birthday" => "16",
            "season_id" => "4",
            "gender" => "Female",
            "occupation" => "Stylist",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/e/ea/Emily_icon.png/",
        ]);

        // Emma
        Character::create([
            "name" => "Emma",
            "birthday" => "13",
            "season_id" => "2",
            "gender" => "Female",
            "occupation" => "Taco Truck owner",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/7/7b/Emma_icon.png/",
        ]);

        // Erika
        Character::create([
            "name" => "Erika",
            "birthday" => "8",
            "season_id" => "4",
            "gender" => "Female",
            "occupation" => "Stylist",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/8/87/Erika_icon.png/",
        ]);

        // Eva
        Character::create([
            "name" => "Eva",
            "birthday" => "13",
            "season_id" => "2",
            "gender" => "Female",
            "occupation" => "Baker",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/7/77/Eva_icon.png/",
        ]);

        // Frank
        Character::create([
            "name" => "Frank",
            "birthday" => "16",
            "season_id" => "2",
            "gender" => "Male",
            "occupation" => "Cook",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/2/2f/Frank_icon.png/",
        ]);

        // Giu
        // Goddess of Flowers
        // Gong
        // Grantle
        // Grog
        // Groo

        // Jack
        Character::create([
            "name" => "Jack",
            "gender" => "Male",
            "occupation" => "Rancher",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/6/6f/Jack_icon.png/",
        ]);

        // Jim
        Character::create([
            "name" => "Jim",
            "birthday" => "6",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Cook",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/3/3d/Jim_icon.png/",
        ]);

        // Jio Dan

        // Joko
        Character::create([
            "name" => "Joko",
            "birthday" => "4",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Carpenter",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/3/38/Joko_icon.png/",
        ]);

        // Judge Ross
        // Karen

        // Kenny
        Character::create([
            "name" => "Kenny",
            "birthday" => "9",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Rancher",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/5/5f/Kenny_icon.png/",
        ]);

        // Kira
        Character::create([
            "name" => "Kira",
            "gender" => "Female",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/ab/Kira_icon.png/",
        ]);

        // Leah
        Character::create([
            "name" => "Leah",
            "birthday" => "24",
            "season_id" => "2",
            "gender" => "Female",
            "occupation" => "Yoga instructor",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/d/d5/Leah_icon.png/",
        ]);

        // Lily
        Character::create([
            "name" => "Lily",
            "birthday" => "19",
            "season_id" => "3",
            "gender" => "Female",
            "occupation" => "Cybersecurity",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/a7/Lily_icon.png/",
        ]);

        // Ling
        Character::create([
            "name" => "Ling",
            "birthday" => "17",
            "season_id" => "1",
            "gender" => "Female",
            "occupation" => "Marine biologist",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/e/e0/Ling_icon.png/",
        ]);

        // Luke
        Character::create([
            "name" => "Luke",
            "birthday" => "16",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Socket Electronics owner",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/f/fd/Luke_icon.png/",
        ]);

        // Macy
        Character::create([
            "name" => "Macy",
            "birthday" => "25",
            "season_id" => "1",
            "gender" => "Female",
            "occupation" => "Photographer",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/6/6b/Macy_icon.png/",
        ]);

        // Mark
        Character::create([
            "name" => "Mark",
            "birthday" => "18",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Band of Smiles member",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/0/04/Mark_icon.png/",
        ]);

        // Millie
        Character::create([
            "name" => "Millie",
            "birthday" => "3",
            "season_id" => "4",
            "gender" => "Female",
            "occupation" => "Librarian",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/b/b5/Millie_icon.png/",
        ]);

        // Nina
        Character::create([
            "name" => "Nina",
            "birthday" => "24",
            "season_id" => "4",
            "gender" => "Female",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/4/46/Nina_icon.png/",
        ]);

        // Noah
        Character::create([
            "name" => "Noah",
            "birthday" => "10",
            "season_id" => "4",
            "gender" => "Male",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/3/38/Noah_icon.png/",
        ]);

        // Oliver
        Character::create([
            "name" => "Oliver",
            "birthday" => "12",
            "season_id" => "1",
            "gender" => "Male",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/8/8a/Oliver_icon.png/",
        ]);

        // Pablo
        Character::create([
            "name" => "Pablo",
            "birthday" => "27",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Blacksmith",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/a/ad/Pablo_icon.png/",
        ]);

        // Paul
        Character::create([
            "name" => "Paul",
            "birthday" => "7",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Wildlife photographer",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/4/4c/Paul_icon.png/",
        ]);

        // Peanut

        // Rafael
        Character::create([
            "name" => "Rafael",
            "birthday" => "4",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Blacksmith",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/6/62/Rafael_icon.png/revision/",
        ]);

        // Raina

        // Raj
        Character::create([
            "name" => "Raj",
            "birthday" => "2",
            "season_id" => "4",
            "gender" => "Nonbinary",
            "occupation" => "Barista",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/1/1a/Raj_icon.png/",
        ]);

        // Randy
        Character::create([
            "name" => "Randy",
            "birthday" => "19",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Teacher",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/9/95/Randy_icon.png/",
        ]);

        // Ratih

        // Sam
        Character::create([
            "name" => "Sam",
            "birthday" => "8",
            "season_id" => "2",
            "gender" => "Male",
            "occupation" => "General Store owner",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/2/26/Sam_icon.png/",
        ]);

        // Scott
        Character::create([
            "name" => "Scott",
            "birthday" => "12",
            "season_id" => "1",
            "gender" => "Male",
            "occupation" => "Archeologist",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/8/87/Scott_icon.png/",
        ]);

        // Senja

        // Suki
        Character::create([
            "name" => "Suki",
            "birthday" => "27",
            "season_id" => "4",
            "gender" => "Female",
            "occupation" => "Coral Inn owner",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/f/f8/Suki_icon.png/",
        ]);

        // Sunny
        Character::create([
            "name" => "Sunny",
            "birthday" => "26",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Store Owner",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/4/43/Sunny_icon.png/",
        ]);

        // Surya
        Character::create([
            "name" => "Surya",
            "birthday" => "25",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Marine biologist",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/5/56/Surya_icon.png/",
        ]);

        // Taco

        // Takeba
        Character::create([
            "name" => "Takeba",
            "gender" => "Male",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/b/b4/Takeba_icon.png/",
        ]);

        // Theo
        Character::create([
            "name" => "Theo",
            "birthday" => "11",
            "season_id" => "3",
            "gender" => "Male",
            "occupation" => "Fisherman",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/5/57/Theo_icon.png/",
        ]);

        // Valentina
        Character::create([
            "name" => "Valentina",
            "birthday" => "3",
            "season_id" => "2",
            "gender" => "Female",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/9/9a/Valentina_icon.png/",
        ]);

        // Wakuu
        Character::create([
            "name" => "Wakuu",
            "birthday" => "8",
            "season_id" => "4",
            "gender" => "Male",
            "occupation" => "Astrophysicist",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/6/6f/Wakuu_icon.png/",
        ]);

        // Walter
        Character::create([
            "name" => "Walter",
            "birthday" => "20",
            "season_id" => "1",
            "gender" => "Male",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/1/13/Walter_icon.png/",
        ]);

        // Wataru
        Character::create([
            "name" => "Wataru",
            "birthday" => "3",
            "season_id" => "2",
            "gender" => "Male",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/d/d7/Wataru_icon.png/",
        ]);

        // Yuri
        Character::create([
            "name" => "Name",
            "birthday" => "28",
            "season_id" => "2",
            "gender" => "Female",
            "occupation" => "Doctor",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/b/b6/Yuri_icon.png/",
        ]);

        // Zarah
        Character::create([
            "name" => "Zarah",
            "birthday" => "16",
            "season_id" => "2",
            "gender" => "Female",
            "occupation" => "Treasure hunter",
            "isRomanceable" => "1",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/4/48/Zarah_icon.png/",
        ]);

        // Zoe
        Character::create([
            "name" => "Zoe",
            "birthday" => "8",
            "season_id" => "4",
            "gender" => "Female",
            "isRomanceable" => "0",
            "icon" =>
                "https://static.wikia.nocookie.net/coralisland/images/0/07/Zoe_icon.png/",
        ]);
    }
}
