/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/userinfo': {
    /** get user info */
    get: operations['getUserInfo']
  }
  '/team/{id}/gcp_projects': {
    /** Query and return all GCP projects for the team */
    get: operations['getGCPProjects']
    parameters: {
      path: {
        /** Team ID */
        id: string
      }
    }
  }
  '/gcp/{id}/tables': {
    /** Return all BigQuery tables in gcp project */
    get: operations['getBigQueryTables']
    parameters: {
      path: {
        /** GCP project ID */
        id: string
      }
    }
  }
  '/dataproducts': {
    /** List all dataproducts */
    get: operations['getDataproducts']
    /** Create a new dataproduct */
    post: operations['createDataproduct']
  }
  '/dataproducts/{id}': {
    /** List a dataproduct with datasets */
    get: operations['getDataproduct']
    /** Update a dataproduct */
    put: operations['updateDataproduct']
    /** Delete a dataproduct */
    delete: operations['deleteDataproduct']
  }
  '/datasets': {
    /** Create a new dataset */
    post: operations['createDataset']
  }
  '/datasets/{id}': {
    /** Get dataset */
    get: operations['getDataset']
    /** Update a dataset */
    put: operations['updateDataset']
    /** Delete a dataset */
    delete: operations['deleteDataset']
  }
  '/datasets/{id}/metadata': {
    /** Get dataset metadata */
    get: operations['getDatasetMetadata']
  }
  '/search': {
    /** Search in NADA */
    get: operations['search']
    parameters: {
      query: {
        q?: string
        limit?: number
        offset?: number
      }
    }
  }
}

export interface components {
  schemas: {
    Dataproduct: {
      id: string
      name: string
      description?: string
      slug: string
      repo?: string
      last_modified: string
      created: string
      owner: components['schemas']['Owner']
      keywords?: string[]
      datasets: components['schemas']['DatasetSummary'][]
    }
    DatasetSummary: {
      id: string
      name: string
      type: components['schemas']['DatasetType']
    }
    DatasetType: 'bigquery'
    Owner: {
      team: string
      teamkatalogen?: string
    }
    BigQuery: {
      project_id: string
      dataset: string
      table: string
    }
    NewDataproduct: {
      name: string
      description?: string
      slug?: string
      repo?: string
      owner: components['schemas']['Owner']
      keywords?: string[]
    }
    UpdateDataproduct: {
      name: string
      description?: string
      slug?: string
      repo?: string
      keywords?: string[]
    }
    UserInfo: {
      name: string
      email: string
      teams: string[]
    }
    Dataset: {
      id: string
      dataproduct_id: string
      name: string
      description?: string
      pii: boolean
      type: components['schemas']['DatasetType']
      bigquery: components['schemas']['BigQuery']
    }
    NewDataset: {
      name: string
      description?: string
      dataproduct_id: string
      pii: boolean
      bigquery: components['schemas']['BigQuery']
    }
    TableColumn: {
      name: string
      type: string
      mode: string
      description: string
    }
    DatasetMetadata: {
      dataset_id: string
      schema: components['schemas']['TableColumn'][]
    } & {
      id: unknown
    }
    SearchResultEntry: {
      url: string
      type: components['schemas']['SearchResultType']
      id: string
      name: string
      excerpt: string
    }
    SearchResultType: 'dataset' | 'dataproduct' | 'datapackage'
  }
}

export interface operations {
  /** get user info */
  getUserInfo: {
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['UserInfo']
        }
      }
    }
  }
  /** Query and return all GCP projects for the team */
  getGCPProjects: {
    parameters: {
      path: {
        /** Team ID */
        id: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': string[]
        }
      }
    }
  }
  /** Return all BigQuery tables in gcp project */
  getBigQueryTables: {
    parameters: {
      path: {
        /** GCP project ID */
        id: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['BigQuery'][]
        }
      }
    }
  }
  /** List all dataproducts */
  getDataproducts: {
    parameters: {
      query: {
        limit?: number
        offset?: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Dataproduct'][]
        }
      }
    }
  }
  /** Create a new dataproduct */
  createDataproduct: {
    responses: {
      /** Created successfully */
      201: {
        content: {
          'application/json': components['schemas']['Dataproduct']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['NewDataproduct']
      }
    }
  }
  /** List a dataproduct with datasets */
  getDataproduct: {
    parameters: {
      path: {
        /** Dataproduct ID */
        id: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Dataproduct'][]
        }
      }
    }
  }
  /** Update a dataproduct */
  updateDataproduct: {
    parameters: {
      path: {
        /** Dataproduct ID */
        id: string
      }
    }
    responses: {
      /** Updated OK */
      200: {
        content: {
          'application/json': components['schemas']['Dataproduct']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateDataproduct']
      }
    }
  }
  /** Delete a dataproduct */
  deleteDataproduct: {
    parameters: {
      path: {
        /** Dataproduct ID */
        id: string
      }
    }
    responses: {
      /** Deleted OK */
      204: never
    }
  }
  /** Create a new dataset */
  createDataset: {
    responses: {
      /** Created successfully */
      201: {
        content: {
          'application/json': components['schemas']['Dataset']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['NewDataset']
      }
    }
  }
  /** Get dataset */
  getDataset: {
    parameters: {
      path: {
        /** Dataset ID */
        id: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Dataset']
        }
      }
    }
  }
  /** Update a dataset */
  updateDataset: {
    parameters: {
      path: {
        /** Dataset ID */
        id: string
      }
    }
    responses: {
      /** Updated OK */
      200: {
        content: {
          'application/json': components['schemas']['Dataset']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['NewDataset']
      }
    }
  }
  /** Delete a dataset */
  deleteDataset: {
    parameters: {
      path: {
        /** Dataset ID */
        id: string
      }
    }
    responses: {
      /** Deleted OK */
      204: never
    }
  }
  /** Get dataset metadata */
  getDatasetMetadata: {
    parameters: {
      path: {
        /** Dataset ID */
        id: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['DatasetMetadata']
        }
      }
    }
  }
  /** Search in NADA */
  search: {
    parameters: {
      query: {
        q?: string
        limit?: number
        offset?: number
      }
    }
    responses: {
      /** Search result */
      200: {
        content: {
          'application/json': components['schemas']['SearchResultEntry'][]
        }
      }
    }
  }
}

export interface external {}
