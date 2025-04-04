package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.Endereco;
import br.com.estetica.agendaweb.repositories.EnderecoRepository;
import br.com.estetica.agendaweb.services.EnderecoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EnderecoServiceImpl implements EnderecoService {

    private final EnderecoRepository enderecoRepository;

    @Override
    public void save(Endereco endereco) {
        enderecoRepository.save(endereco);
    }

    @Override
    public Optional<Endereco> findById(Long id) {
        return enderecoRepository.findById(id);
    }

    @Override
    public List<Endereco> findAll() {
        return enderecoRepository.findAll();
    }

    @Override
    public void update(Long id, Endereco enderecoAtualizado) {
        enderecoAtualizado.setId(id);
        enderecoRepository.save(enderecoAtualizado);
    }

    @Override
    public void deleteById(Long id) {
        enderecoRepository.deleteById(id);
    }
}
