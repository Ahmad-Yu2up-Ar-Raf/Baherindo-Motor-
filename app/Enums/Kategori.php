<?php

namespace App\Enums;

enum Kategori: string
{
    case Bebek = 'bebek';
    case Matic = 'matic';
    case Sport = 'sport';
    case Trail = 'trail';
    case Naked = 'naked';
    case Cruiser = 'cruiser';
    case Touring = 'touring';
    case Adventure = 'adventure';
    case Supermoto = 'supermoto';
    case Retro = 'retro';
    case Electric = 'electric';
    case Moped = 'moped';
    case ATV = 'atv';
    case Dirt = 'dirt';
    case Enduro = 'enduro';
    case Cafe_Racer = 'cafe_racer';
    case Bobber = 'bobber';
    case Chopper = 'chopper';
    case Other = 'other';

    public function getLabel(): string
    {
        return match($this) {
            self::Bebek => 'Bebek',
            self::Matic => 'Matic/Scooter',
            self::Sport => 'Sport',
            self::Trail => 'Trail',
            self::Naked => 'Naked Bike',
            self::Cruiser => 'Cruiser',
            self::Touring => 'Touring',
            self::Adventure => 'Adventure',
            self::Supermoto => 'Supermoto',
            self::Retro => 'Retro/Classic',
            self::Electric => 'Electric',
            self::Moped => 'Moped',
            self::ATV => 'ATV/Quad',
            self::Dirt => 'Dirt Bike',
            self::Enduro => 'Enduro',
            self::Cafe_Racer => 'Cafe Racer',
            self::Bobber => 'Bobber',
            self::Chopper => 'Chopper',
            self::Other => 'Lainnya',
        };
    }

    public static function getOptions(): array
    {
        return array_map(
            fn(self $kategori) => [
                'value' => $kategori->value,
                'label' => $kategori->getLabel()
            ],
            self::cases()
        );
    }
}