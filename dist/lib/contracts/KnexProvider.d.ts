declare namespace Najs.Contracts.Eloquent {
    interface KnexProvider<Knex, QueryBuilder, Config extends object> extends Najs.Contracts.Autoload {
        /**
         * Set config by connection name
         * @param {string} connectionName
         * @param {object} config
         */
        setConfig(connectionName: string, config: Config): this;
        /**
         * Set config by connection name
         * @param {string} connectionName
         */
        getConfig(connectionName: string): Config;
        /**
         * Set default config for knex instance
         */
        setDefaultConfig(config: Config): this;
        /**
         * Get default config for knex instance
         */
        getDefaultConfig(): Config;
        /**
         * Create an knex instance
         */
        create(): Knex;
        /**
         * Create an knex cached instance
         */
        create(connectionName: string): Knex;
        /**
         * Create an knex instance with config
         */
        create(config: Config): Knex;
        /**
         * Set config to connection name and create knex cached instance
         */
        create(connectionName: string, config: Config): Knex;
        /**
         * Create query builder from default knex instance
         */
        createQueryBuilder(table: string): QueryBuilder;
        /**
         * Create query builder from knex cached instance by connection name
         */
        createQueryBuilder(table: string, connectionName: string): QueryBuilder;
        /**
         * Create query builder from not cached knex instance with config
         */
        createQueryBuilder(table: string, config: Config): QueryBuilder;
        /**
         * Set config to connection name and create query builder from knex cached instance
         */
        createQueryBuilder(table: string, connectionName: string, config: Config): QueryBuilder;
    }
}
