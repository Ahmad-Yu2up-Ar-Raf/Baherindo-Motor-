<?php

namespace App\Enums;

enum Merek: string
{
    // Japanese Brands
    case Honda = 'honda';
    case Yamaha = 'yamaha';
    case Kawasaki = 'kawasaki';
    case Suzuki = 'suzuki';

    
 
    case Other = 'other';

    public function getLabel(): string
    {
        return match($this) {
            self::Honda => 'Honda',
            self::Yamaha => 'Yamaha',
            self::Kawasaki => 'Kawasaki',
            self::Suzuki => 'Suzuki',

            self::Other => 'Lainnya',
        };
    }

    public function getCountry(): string
    {
        return match($this) {
            self::Honda, self::Yamaha, self::Kawasaki, self::Suzuki, => 'Japan',
         
            default => 'Other',
        };
    }

    public static function getOptions(): array
    {
        return array_map(
            fn(self $merek) => [
                'value' => $merek->value,
                'label' => $merek->getLabel(),
                'country' => $merek->getCountry()
            ],
            self::cases()
        );
    }

    public static function getByCountry(): array
    {
        $grouped = [];
        foreach (self::cases() as $merek) {
            $country = $merek->getCountry();
            $grouped[$country][] = [
                'value' => $merek->value,
                'label' => $merek->getLabel()
            ];
        }
        return $grouped;
    }
}