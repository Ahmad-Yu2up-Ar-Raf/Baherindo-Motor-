<?php

namespace App\Enums;

enum Merek: string
{
    // Japanese Brands
    case Honda = 'honda';
    case Yamaha = 'yamaha';
    case Kawasaki = 'kawasaki';
    case Suzuki = 'suzuki';
    case Mitsubishi = 'mitsubishi';
    
    // European Brands
    case BMW = 'bmw';
    case Ducati = 'ducati';
    case KTM = 'ktm';
    case Aprilia = 'aprilia';
    case MV_Agusta = 'mv_agusta';
    case Triumph = 'triumph';
    case Husqvarna = 'husqvarna';
    case Beta = 'beta';
    case Sherco = 'sherco';
    case Gas_Gas = 'gas_gas';
    case Benelli = 'benelli';
    case Moto_Guzzi = 'moto_guzzi';
    case Piaggio = 'piaggio';
    case Vespa = 'vespa';
    case Peugeot = 'peugeot';
    case Husaberg = 'husaberg';
    
    // American Brands
    case Harley_Davidson = 'harley_davidson';
    case Indian = 'indian';
    case Victory = 'victory';
    case Erik_Buell = 'erik_buell';
    case Zero = 'zero';
    
    // Chinese Brands
    case CFMoto = 'cfmoto';
    case Benelli_QJ = 'benelli_qj';
    case Lifan = 'lifan';
    case Zongshen = 'zongshen';
    case Loncin = 'loncin';
    case Keeway = 'keeway';
    case Sym = 'sym';
    case Kymco = 'kymco';
    case Voge = 'voge';
    case Colove = 'colove';
    
    // Korean Brands
    case Hyosung = 'hyosung';
    case Daelim = 'daelim';
    
    // Indian Brands
    case TVS = 'tvs';
    case Bajaj = 'bajaj';
    case Hero = 'hero';
    case Royal_Enfield = 'royal_enfield';
    
    // Malaysian Brands
    case Modenas = 'modenas';
    case Naza = 'naza';
    
    // Other Brands
    case Ural = 'ural';
    case Jawa = 'jawa';
    case Can_Am = 'can_am';
    case Polaris = 'polaris';
    case Arctic_Cat = 'arctic_cat';
    case Other = 'other';

    public function getLabel(): string
    {
        return match($this) {
            self::Honda => 'Honda',
            self::Yamaha => 'Yamaha',
            self::Kawasaki => 'Kawasaki',
            self::Suzuki => 'Suzuki',
            self::Mitsubishi => 'Mitsubishi',
            self::BMW => 'BMW',
            self::Ducati => 'Ducati',
            self::KTM => 'KTM',
            self::Aprilia => 'Aprilia',
            self::MV_Agusta => 'MV Agusta',
            self::Triumph => 'Triumph',
            self::Husqvarna => 'Husqvarna',
            self::Beta => 'Beta',
            self::Sherco => 'Sherco',
            self::Gas_Gas => 'Gas Gas',
            self::Benelli => 'Benelli',
            self::Moto_Guzzi => 'Moto Guzzi',
            self::Piaggio => 'Piaggio',
            self::Vespa => 'Vespa',
            self::Peugeot => 'Peugeot',
            self::Husaberg => 'Husaberg',
            self::Harley_Davidson => 'Harley Davidson',
            self::Indian => 'Indian',
            self::Victory => 'Victory',
            self::Erik_Buell => 'Erik Buell',
            self::Zero => 'Zero',
            self::CFMoto => 'CFMoto',
            self::Benelli_QJ => 'Benelli (QJ)',
            self::Lifan => 'Lifan',
            self::Zongshen => 'Zongshen',
            self::Loncin => 'Loncin',
            self::Keeway => 'Keeway',
            self::Sym => 'SYM',
            self::Kymco => 'Kymco',
            self::Voge => 'Voge',
            self::Colove => 'Colove',
            self::Hyosung => 'Hyosung',
            self::Daelim => 'Daelim',
            self::TVS => 'TVS',
            self::Bajaj => 'Bajaj',
            self::Hero => 'Hero',
            self::Royal_Enfield => 'Royal Enfield',
            self::Modenas => 'Modenas',
            self::Naza => 'Naza',
            self::Ural => 'Ural',
            self::Jawa => 'Jawa',
            self::Can_Am => 'Can-Am',
            self::Polaris => 'Polaris',
            self::Arctic_Cat => 'Arctic Cat',
            self::Other => 'Lainnya',
        };
    }

    public function getCountry(): string
    {
        return match($this) {
            self::Honda, self::Yamaha, self::Kawasaki, self::Suzuki, self::Mitsubishi => 'Japan',
            self::BMW, self::KTM, self::Aprilia, self::MV_Agusta, self::Triumph, 
            self::Husqvarna, self::Beta, self::Sherco, self::Gas_Gas, self::Benelli, 
            self::Moto_Guzzi, self::Piaggio, self::Vespa, self::Peugeot, self::Husaberg, 
            self::Ducati => 'Europe',
            self::Harley_Davidson, self::Indian, self::Victory, self::Erik_Buell, self::Zero => 'USA',
            self::CFMoto, self::Benelli_QJ, self::Lifan, self::Zongshen, self::Loncin, 
            self::Keeway, self::Sym, self::Kymco, self::Voge, self::Colove => 'China/Taiwan',
            self::Hyosung, self::Daelim => 'South Korea',
            self::TVS, self::Bajaj, self::Hero, self::Royal_Enfield => 'India',
            self::Modenas, self::Naza => 'Malaysia',
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