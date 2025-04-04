package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
