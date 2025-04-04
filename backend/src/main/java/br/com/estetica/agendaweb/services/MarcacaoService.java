package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.dto.MarcacaoDTO;
import br.com.estetica.agendaweb.model.Marcacao;

import java.util.List;
import java.util.Optional;

public interface MarcacaoService {

    void enviarParaSalvar(MarcacaoDTO dto) throws Exception;

    void enviarParaAtualizar(Long id,MarcacaoDTO dto) throws Exception;

    void save(Marcacao marcacao);

    Optional<Marcacao> findById(Long id);

    List<Marcacao> findAll();

    void update(Long id, Marcacao marcacaoAtualizada);

    void deleteById(Long id);

}
