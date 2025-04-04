package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    void save(Usuario usuario);

    Optional<Usuario> findById(Long id);

    List<Usuario> findAll();

    void update(Long id, Usuario usuarioAtualizado);

    void deleteById(Long id);
}
