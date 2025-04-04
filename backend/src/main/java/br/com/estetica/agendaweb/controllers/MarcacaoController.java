package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.MarcacaoDTO;
import br.com.estetica.agendaweb.services.MarcacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Marcação", description = " - Operações relacionadas a marcação")
@RequestMapping("reservation")
@RequiredArgsConstructor
public class MarcacaoController {

    private final MarcacaoService marcacaoService;

    @Operation(summary = "Adicionar Nova Marcação")
    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody MarcacaoDTO dto) throws Exception {
        marcacaoService.enviarParaSalvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Marcacao Criada com sucesso!");
    }

    @Operation(summary = "Buscar Todas as Marcações")
    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<MarcacaoDTO> dtos = marcacaoService.findAll().stream().map(MarcacaoDTO::new).toList();
        return ResponseEntity.ok().body(dtos);
    }

    @Operation(summary = "Buscar por uma Marcação")
    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        MarcacaoDTO dto = marcacaoService.findById(id).map(MarcacaoDTO::new).orElse(null);
        return ResponseEntity.ok().body(dto);
    }

    @Operation(summary = "Atualizar uma Marcação")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody MarcacaoDTO dto) throws Exception {
        marcacaoService.enviarParaAtualizar(id, dto);
        return ResponseEntity.ok().body("Marcacao Atualizada com sucesso!");
    }

    @Operation(summary = "Deletar uma Marcação")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        marcacaoService.deleteById(id);
        return ResponseEntity.ok().body("Marcacao Deletada com sucesso!");
    }

}
