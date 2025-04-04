package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.Endereco;

import java.util.List;
import java.util.Optional;

public interface EnderecoService {

    void save(Endereco endereco);

    Optional<Endereco> findById(Long id);

    List<Endereco> findAll();

    void update(Long id, Endereco enderecoAtualizado);

    void deleteById(Long id);

}
