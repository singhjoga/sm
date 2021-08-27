package com.technovator.api.common.repos;

import java.io.Serializable;

import org.springframework.data.repository.NoRepositoryBean;
@NoRepositoryBean
public interface EntityRepository<T, ID extends Serializable> extends BaseRepository<T, ID>{

}
