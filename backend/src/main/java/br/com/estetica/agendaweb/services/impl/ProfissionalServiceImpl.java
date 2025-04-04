package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.Profissional;
import br.com.estetica.agendaweb.repositories.ProfissionalRespository;
import br.com.estetica.agendaweb.services.ProfissionalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProfissionalServiceImpl implements ProfissionalService {

    private final ProfissionalRespository profissionalRespository;

    @Override
    public void save(Profissional profissional) {
        profissionalRespository.save(profissional);
    }

    @Override
    public Optional<Profissional> findById(Long id) {
        return profissionalRespository.findById(id);
    }

    @Override
    public List<Profissional> findAll() {
        return profissionalRespository.findAll();
    }

    @Override
    public void update(Long id, Profissional profissionalAtualizado) {
        profissionalAtualizado.setId(id);
        profissionalRespository.save(profissionalAtualizado);
    }

    @Override
    public void delete(Long id) {
        profissionalRespository.deleteById(id);
    }
}
