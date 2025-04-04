package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.EventoDTO;
import br.com.estetica.agendaweb.model.Evento;
import br.com.estetica.agendaweb.model.Procedimento;
import br.com.estetica.agendaweb.services.ProfissionalService;
import br.com.estetica.agendaweb.services.impl.EventoServiceImpl;
import br.com.estetica.agendaweb.services.impl.ProcedimentoServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Tag(name = "Evento", description = " - Operações relacionadas aos eventos")
@RequestMapping("event")
public class EventoController {

    private final EventoServiceImpl eventoService;

    private final ProfissionalService profissionalService;

    private final ProcedimentoServiceImpl procedimentoService;

    @Operation(summary = "Adicionar Novo Evento")
    @PostMapping("/save")
    public ResponseEntity<String> save(@Valid @RequestBody EventoDTO dto) {
        Set<Procedimento> listaProcedimento = new HashSet<>();
        dto.idProdecedimento().forEach(procedimentoId -> {
            procedimentoService.findByID(procedimentoId).ifPresent(listaProcedimento::add);
        });

        Evento evento = new Evento();
        evento.setNome(dto.nome());
        evento.setDuracao(dto.duracaoEmMinuto());
        evento.setDesativado(dto.desativado());
        evento.setProcedimentos(listaProcedimento);

        eventoService.save(evento);
        return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso.");
    }

    @Operation(summary = "Listar Todos os Eventos")
    @GetMapping("/getAll")
    public ResponseEntity<List<EventoDTO>> getAll() {
        List<Evento> eventos = eventoService.findAll();
        return ResponseEntity.ok().body(eventos.stream().map(EventoDTO::new).collect(Collectors.toList()));
    }

    @Operation(summary = "Buscar por um Evento")
    @GetMapping("/getById/{id}")
    public ResponseEntity<EventoDTO> getById(@PathVariable Long id) {
        Optional<Evento> optionalEvento = eventoService.findById(id);
        return optionalEvento.map(evento -> ResponseEntity.ok().body(new EventoDTO(evento)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Atualizar Evento")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @Valid @RequestBody EventoDTO dto) {
        Optional<Evento> optionalEvento = eventoService.findById(id);
        Set<Procedimento> listaProcedimento = new HashSet<>();
        dto.idProdecedimento().forEach(procedimentoId -> {
            procedimentoService.findByID(procedimentoId).ifPresent(listaProcedimento::add);
        });

        if (optionalEvento.isEmpty() || listaProcedimento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Evento, médico ou procedimento inválido.");
        }

        Evento evento = optionalEvento.get();
        evento.setNome(dto.nome());
        evento.setDuracao(dto.duracaoEmMinuto());
        evento.setDesativado(dto.desativado());
        evento.getProcedimentos().clear();
        evento.setProcedimentos(listaProcedimento);

        eventoService.update(id, evento);
        return ResponseEntity.ok().body("Evento atualizado com sucesso");
    }

    @Operation(summary = "Excluir Evento")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        eventoService.deleteById(id);
        return ResponseEntity.ok().body("Evento excluído com sucesso");
    }

}
