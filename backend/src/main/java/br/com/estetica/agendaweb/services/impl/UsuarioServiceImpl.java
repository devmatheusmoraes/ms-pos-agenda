package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.Usuario;
import br.com.estetica.agendaweb.repositories.UsuarioRepository;
import br.com.estetica.agendaweb.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public void save(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public void update(Long id, Usuario usuarioAtualizado) {
        usuarioAtualizado.setId(id);
        usuarioRepository.save(usuarioAtualizado);
    }

    @Override
    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }
}
