<!-- Hola, luego actualizaré esto. -->

Implementación Básica de un Sistema Distribuido IoT

El objetivo de esta actividad es diseñar e implementar un sistema distribuido IoT que permita la recolección, transmisión, almacenamiento y consulta de datos provenientes de sensores simulados (temperatura y humedad), utilizando tecnologías como Node-RED, MQTT, Express.js y una base de datos local, garantizando la comunicación eficiente entre componentes.
Para esta actividad, se usan las siguientes consignas:
•	Usar simuladores como Node-RED
o	Crear 2 "sensores" que publiquen datos periódicamente (temperatura y humedad)
•	Configurar un broker MQTT (Mosquitto) como middleware de comunicación
o	Implementar subscriptores que reciban y registren los datos publicados.
•	Crear un servidor simple (Express.js) que:
o	Reciba datos vía MQTT o HTTP POST.
o	Almacene datos en una base de datos básica (SQLite o JSON local).
o	Ofrezca una API REST para consultar los datos recolectados.

-- To be translated to english --