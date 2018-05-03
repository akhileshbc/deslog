<?php

require '../classes/CountryRepository.php';

header('Content-type: application/json');
echo ")]}'\n";

$countries = CountryRepository::getcountries();

echo json_encode($countries);
