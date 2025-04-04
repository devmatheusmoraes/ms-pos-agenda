package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteService {

    void save (Cliente cliente);

    Optional<Cliente> findById(Long id);

    List<Cliente> findAll();

    void update (Long id,Cliente clienteAtualizado);

    void deleteById(Long id);
}
