package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.dto.MarcacaoDTO;
import br.com.estetica.agendaweb.model.Marcacao;
import br.com.estetica.agendaweb.repositories.MarcacaoRespository;
import br.com.estetica.agendaweb.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MarcacaoServiceImpl implements MarcacaoService {

    private final MarcacaoRespository marcacaoRespository;

    private final ClienteService clienteService;

    private final ProfissionalService profissionalService;

    private final UsuarioService usuarioService;

    private final AgendaConfiguracaoService agendaConfiguracaoService;

    @Override
    public void enviarParaSalvar(MarcacaoDTO dto) throws Exception {
        save(construirMarcacao(dto));
    }

    @Override
    public void enviarParaAtualizar(Long id,MarcacaoDTO dto) throws Exception {
        update(id, construirMarcacao(dto));
    }

    private Marcacao construirMarcacao(MarcacaoDTO dto) throws Exception {
        Marcacao marcacao = new Marcacao(dto);
        marcacao.setCliente(clienteService.findById(dto.clienteId()).orElseThrow(() -> new Exception("O cliente informado não existe")));
        marcacao.setProfissional(profissionalService.findById(dto.profissionalId()).orElseThrow(() -> new Exception("O profissional informado não existe")));
        marcacao.setUsuario(usuarioService.findById(dto.usuarioId()).orElseThrow(() -> new Exception("O usuário informado não existe")));
        marcacao.setAgendaConfiguracao(agendaConfiguracaoService.findById(dto.agendaConfiguracaoId()).orElseThrow(() -> new Exception("A configuração de agenda informada não existe")));
        return marcacao;
    }

    @Override
    public void save(Marcacao marcacao) {
        marcacaoRespository.save(marcacao);
    }

    @Override
    public Optional<Marcacao> findById(Long id) {
        return marcacaoRespository.findById(id);
    }

    @Override
    public List<Marcacao> findAll() {
        return marcacaoRespository.findAll();
    }

    @Override
    public void update(Long id, Marcacao marcacaoAtualizada) {
        marcacaoAtualizada.setId(id);
        marcacaoRespository.save(marcacaoAtualizada);
    }

    @Override
    public void deleteById(Long id) {
        marcacaoRespository.deleteById(id);
    }
}
