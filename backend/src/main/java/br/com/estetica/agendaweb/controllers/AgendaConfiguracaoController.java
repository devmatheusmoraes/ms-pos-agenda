package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.AgendaConfiguracaoDTO;
import br.com.estetica.agendaweb.model.AgendaConfiguracao;
import br.com.estetica.agendaweb.model.Evento;
import br.com.estetica.agendaweb.repositories.EventoRepository;
import br.com.estetica.agendaweb.services.AgendaConfiguracaoService;
import br.com.estetica.agendaweb.services.EventoService;
import br.com.estetica.agendaweb.services.ProfissionalService;
import br.com.estetica.agendaweb.services.ValidationService;
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

@RestController
@Tag(name = "Configurações da Agenda", description = " - Operações relacionadas configuração da agenda")
@RequestMapping("scheduleConfiguration")
@RequiredArgsConstructor
public class AgendaConfiguracaoController {

    private final AgendaConfiguracaoService agendaConfiguracaoService;

    private final EventoService eventoService;

    private final ProfissionalService profissionalService;

    private final EventoRepository eventoRepository;

    private final ValidationService validationService;

    @Operation(summary = "Adicionar Nova Configuração de Agenda")
    @PostMapping("/save")
    public ResponseEntity<String> save(@Valid @RequestBody AgendaConfiguracaoDTO dto){
        dto.eventoId().forEach(evento -> validationService.validateIdExists(evento, eventoRepository));
        Set<Evento> evento = new HashSet<>();
        dto.eventoId().forEach(event -> eventoService.findById(event).ifPresent(evento::add));
        if (evento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Evento informado não encontrado");
        }
        AgendaConfiguracao agendaConfiguracao = new AgendaConfiguracao(dto);
        agendaConfiguracao.setEventos(evento);
        agendaConfiguracao.setProfissional(profissionalService.findById(dto.profissionalId()).orElseThrow());
        try {
            agendaConfiguracaoService.save(agendaConfiguracao);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Configuração de agenda criada com sucesso.");
    }

    @Operation(summary = "Buscar todas as Configurações de Agenda")
    @GetMapping("/getAll")
    public ResponseEntity<List<AgendaConfiguracaoDTO>> getAll(){
        List<AgendaConfiguracao> listaAgendaConfiguracao = agendaConfiguracaoService.findAll();
        return ResponseEntity.ok().body(listaAgendaConfiguracao.stream().map(AgendaConfiguracaoDTO::new).collect(Collectors.toList()));
    }

    @Operation(summary = "Buscar por uma Configuração de Agenda")
    @GetMapping("/getById/{id}")
    public ResponseEntity<AgendaConfiguracaoDTO> getById(@PathVariable Long id){
        Optional<AgendaConfiguracao> agendaConfiguracaoOptional = agendaConfiguracaoService.findById(id);
        return agendaConfiguracaoOptional.map(agendaConfiguracao -> ResponseEntity.ok().body(new AgendaConfiguracaoDTO(agendaConfiguracao)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Atualizar uma Configuração de Agenda")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody AgendaConfiguracaoDTO dto){
        Optional<AgendaConfiguracao> agendaConfiguracaoOptional = agendaConfiguracaoService.findById(id);
        Set<Evento> evento = new HashSet<>();
        dto.eventoId().forEach(event -> eventoService.findById(event).ifPresent(evento::add));
        if (evento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Evento informado não encontrado");
        }
        AgendaConfiguracao agendaConfiguracao = new AgendaConfiguracao(dto);
        agendaConfiguracao.setEventos(evento);
        agendaConfiguracaoService.update(id,agendaConfiguracao);
        return ResponseEntity.ok().body("Configuração de agenda atualizada.");
    }

    @Operation(summary = "Excluir uma Configuração de Agenda")
    @GetMapping("/delete/{id}")
    @DeleteMapping
    public ResponseEntity<String> delete(@PathVariable Long id){
        agendaConfiguracaoService.deleteById(id);
        return ResponseEntity.ok().body("Configuração de agenda excluída com sucesso");
    }

}
