<?php

require '../classes/CountryRepository.php';

header('Content-type: application/json');
echo ")]}'\n";

$countries = CountryRepository::getCountries();
echo json_encode($countries);
