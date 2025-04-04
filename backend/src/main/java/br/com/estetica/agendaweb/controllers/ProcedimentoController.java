package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.ProcedimentoDTO;
import br.com.estetica.agendaweb.model.Procedimento;
import br.com.estetica.agendaweb.services.impl.ProcedimentoServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Tag(name = "Procedimento", description = " - Operações relacionadas aos procedimentos")
@RequestMapping("/procedure")
public class ProcedimentoController {

    private final ProcedimentoServiceImpl procedimentoService;

    @Operation(summary = "Adicionar um Novo Procedimento")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody ProcedimentoDTO dto){
        Procedimento procedimento = new Procedimento(dto);
        procedimentoService.save(procedimento);
        return ResponseEntity.status(HttpStatus.CREATED).body("Procedimento salvo com sucesso.");
    }

    @Operation(summary = "Listar Todos os Procedimentos")
    @GetMapping("/getAll")
    public ResponseEntity<List<ProcedimentoDTO>> getAll(){
        List<Procedimento> procedimentos = procedimentoService.findAll();
        return ResponseEntity.ok().body(procedimentos.stream().map(ProcedimentoDTO::new).collect(Collectors.toList()));
    }

    @Operation(summary = "Buscar por um Procedimento")
    @GetMapping("/getById/{id}")
    public ResponseEntity<ProcedimentoDTO> getById(@PathVariable Long id){
        Optional<Procedimento> procedimentoOptional = procedimentoService.findByID(id);
        return procedimentoOptional.map(procedimento -> ResponseEntity.ok().body(new ProcedimentoDTO(procedimento)))
                .orElseGet(() -> ResponseEntity.status((HttpStatus.NOT_FOUND)).build());
    }

    @Operation(summary = "Atualizar Procedimento")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody ProcedimentoDTO dto){
        Procedimento procedimento = new Procedimento(dto);
        procedimentoService.update(id, procedimento);
        return ResponseEntity.ok().body("Procedimento atualizado com sucesso");
    }

    @Operation(summary = "Excluir Procedimento")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        procedimentoService.deleteById(id);
        return ResponseEntity.ok().body("Procedimento excluído com sucesso");
    }


}
