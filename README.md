## projeto api crud com mysql em nextjs / reactjs

é uma simples demonstração do que pode ser realizado por esse importante recurso de api do nextjs

com certeza existem códigos mais eficientes, mas o objetivo desse exemplo é apresentar os recursos de forma bem simples para o entendimento do processo, você poderá aprimirá-lo de várias formas

a seguir a estrutura e dados para você testar o projeto:
CREATE TABLE `products` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(128) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`details` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

INSERT INTO `products` (`name`, `details`) VALUES
	('tomates', 'sem agrotóxicos'),
	('jabuticaba', 'legítima fruta brasileira'),
	('laranja', 'produto exportação'),
	('limão', 'faça um delicioso suco detox, junte gengibre e couve'),
	('melão', 'doces e saudáveis'),
	('pitanga', 'são difí­ceis de encontrar');

