package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.Procedimento;
import br.com.estetica.agendaweb.repositories.ProcedimentoRepository;
import br.com.estetica.agendaweb.services.ProcedimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProcedimentoServiceImpl implements ProcedimentoService {

    private final ProcedimentoRepository procedimentoRepository;

    @Override
    public void save(Procedimento procedimento) {
        procedimentoRepository.save(procedimento);
    }

    @Override
    public Optional<Procedimento> findByID(Long id) {
        return procedimentoRepository.findById(id);
    }

    @Override
    public List<Procedimento> findAll() {
        return procedimentoRepository.findAll();
    }

    @Override
    public void update(Long id, Procedimento procedimentoAtualizado) {
        procedimentoAtualizado.setId(id);
        procedimentoRepository.save(procedimentoAtualizado);
    }

    @Override
    public void deleteById(Long id) {
        procedimentoRepository.deleteById(id);
    }
}
