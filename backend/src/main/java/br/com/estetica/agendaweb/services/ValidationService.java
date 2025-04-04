package br.com.estetica.agendaweb.services;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ValidationService {

    <T> void validateIdExists(Long id, JpaRepository<T, Long> repository);
}
