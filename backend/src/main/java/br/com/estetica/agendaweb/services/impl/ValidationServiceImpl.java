package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.services.ValidationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ValidationServiceImpl implements ValidationService {

    @Override
    public <T> void validateIdExists(Long id, JpaRepository<T, Long> repository) {
        if (!repository.existsById(id)) {
            String repositoryName = repository.getClass().getGenericInterfaces()[0].getTypeName();
            String entityName = repositoryName.substring(repositoryName.lastIndexOf('.') + 1, repositoryName.indexOf("Repository"));

            throw new EntityNotFoundException(entityName + " not found with id: " + id);
        }
    }

}
