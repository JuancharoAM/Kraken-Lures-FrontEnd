package com.programacionIV.proyectoFinalPresentacion.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	@GetMapping("/index")
	public String index() {
		return "index";
	}
	
	@GetMapping("/productos")
	public String productos() {
		return "paginas/productos/productos";
	}
	
	@GetMapping("/login")
	public String loginKraken() {
		return "paginas/login-kraken/KrakenLogin";
	}

	@GetMapping("/pedido")
	public String pedido() {
		return "paginas/pedido/pedido";
	}

}
