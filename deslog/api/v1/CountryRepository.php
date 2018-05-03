<?php


require 'Course.php';

class CountryRepository {

    private static $countries = array();

    protected static function init() {
        $countries = array();
        array_push($countries, new Course('HSE1', 'hsetraing', '02/12/2018', 'Port Harcourt', '#200,000', 'open', '10', '200'));
        array_push($countries, new Course('HSE1', 'hsetraing', '02/12/2018', 'Port Harcourt', '#200,000', 'open', '10', '200'));
        array_push($countries, new Course('HSE1', 'hsetraing', '02/12/2018', 'Port Harcourt', '#200,000', 'open', '10', '200'));
        array_push($countries, new Course('HSE1', 'hsetraing', '02/12/2018', 'Port Harcourt', '#200,000', 'open', '10', '200'));
        array_push($countries, new Course('HSE1', 'hsetraing', '02/12/2018', 'Port Harcourt', '#200,000', 'open', '10', '200'));
        array_push($countries, new Course('HSE1', 'hsetraing', '02/12/2018', 'Port Harcourt', '#200,000', 'open', '10', '200'));
        self::$countries = $countries;
    }

    public static function getcountries() {
        if (count(self::$countries) === 0) {
            self::init();
        }
        return self::$countries;
    }

    public static function getStates($countryCode) {
        if (count(self::$countries) === 0) {
            self::init();
        }
        $country = array_filter(self::$countries, function($c) use ($countryCode) {
            return $c->code === $countryCode;
        });
        if (count($country) === 0) {
            return array();
        }
        $firstCountry = array_shift($country);
        return $firstCountry->states;
    }

} 