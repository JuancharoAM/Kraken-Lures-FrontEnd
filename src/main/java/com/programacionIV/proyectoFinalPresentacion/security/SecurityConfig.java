package com.programacionIV.proyectoFinalPresentacion.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
		    // Configuration
		    @Bean
		    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		        return httpSecurity
		                .authorizeHttpRequests( auth -> {
		                    auth.requestMatchers("/index", "/productos").permitAll();
		                    auth.anyRequest().authenticated();
		                })
		                .formLogin()
		                    .successHandler(successHandler()) // URL a la que se redirige después del inicio de sesión exitoso		                    
		                    .loginPage("/loginKraken")
		                    .defaultSuccessUrl("/index")
		                    .permitAll()
		                .and()
		                .sessionManagement()
		                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // ALWAYS - IF_REQUIRED - NEVER - STATELESS
		                    .invalidSessionUrl("/KrakenLogin") // Especifica la URL a la cual redirigir al usuario si se detecta una sesión inválida
		                    .maximumSessions(1)// Permite configurar el número máximo de sesiones permitidas para un usuario.
		                    .expiredUrl("/KrakenLogin") // Especifica la URL a la cual redirigir al usuario si su sesión ha expirado debido a la inactividad.
		                    .sessionRegistry(sessionRegistry())
		                .and()
		                .sessionFixation() // migrateSession() - newSession() - none()
		                    .migrateSession()
		                .and()
		                .cors()
		                .and()
		                .build();
		    }

		    @Bean
		    public SessionRegistry sessionRegistry() {
		        return new SessionRegistryImpl();
		    }


		    public AuthenticationSuccessHandler successHandler(){
		        return ((request, response, authentication) -> {
		            response.sendRedirect("/index");
		        });
		    }
	
}
