//package com.eco.backspring.restapis.Expedition_API.config;
//
//import jakarta.persistence.EntityManagerFactory;
//import org.hibernate.jpa.boot.spi.EntityManagerFactoryBuilder;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Bean;
//import javax.sql.DataSource;
//
//import org.springframework.context.annotation.Primary;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//
//@Configuration
//@EnableJpaRepositories(
//        basePackages = "com.eco.backspring.restapis.Expedition_API.repository",
//        entityManagerFactoryRef = "expeditionApiEntityManagerFactory",
//        transactionManagerRef = "expeditionApiTransactionManager"
//)
//
//public class ExpeditionConfig {
//    @Primary
//    @Bean(name = "expeditionApiDataSource")
//    @ConfigurationProperties(prefix = "spring.datasource.exp")
//    public DataSource dataSource() {
//        return DataSourceBuilder.create().build();
//    }
//
//    @Primary
//    @Bean(name = "expeditionApiEntityManager")
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
//            EntityManagerFactoryBuilder builder,
//            @Qualifier("expeditionApiDataSource") DataSource dataSource) {
//        return builder
//                .dataSource(dataSource)
//                .packages("com.eco.model.expeditionApi")
//                .persistenceUnit("expeditionApi")
//                .build();
//    }
//
//    @Primary
//    @Bean(name = "expeditionApiTransactionManager")
//    public PlatformTransactionManager transactionManager(
//            @Qualifier("expeditionApiEntityManager") EntityManagerFactory entityManagerFactory) {
//        return new JpaTransactionManager(entityManagerFactory);
//    }
//}




