package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.Cliente;
import br.com.estetica.agendaweb.repositories.ClienteRepository;
import br.com.estetica.agendaweb.services.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    @Override
    public void save(Cliente cliente) {
        clienteRepository.save(cliente);
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    @Override
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Override
    public void update(Long id, Cliente clienteAtualizado) {
        clienteAtualizado.setId(id);
        clienteRepository.save(clienteAtualizado);
    }

    @Override
    public void deleteById(Long id) {
        clienteRepository.deleteById(id);
    }

}
