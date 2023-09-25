﻿# DeliveryManagement-MERN
{
	"info": {
		"_postman_id": "bc8ea51d-9061-4d19-bd97-565ecc7cf9be",
		"name": "Delivery Management",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "28822882"
	},
	"item": [
		{
			"name": "Create Delivery",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"cname\": \"Updated Customer Name\",\r\n  \"contactNum\": \"Updated Contact Number\",\r\n  \"cusAddress\": \"Updated Address\",\r\n  \"prodCode\": \"Updated Product Code\",\r\n  \"quantity\": 10,\r\n  \"Price\": 75.0,\r\n  \"prodDetails\": \"Updated Product Details\",\r\n  \"date\": \"2023-09-25\"\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/delivery/add",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"delivery",
						"add"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Delivery",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "New Request",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		}
	]
}
