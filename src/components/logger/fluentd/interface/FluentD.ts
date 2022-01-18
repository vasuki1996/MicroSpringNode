export interface FluentD {
    host: string
    port: number
    timeout: number
    reconnectInterval: number
    security: FluentDSecurity
    sendQueueSizeLimit: string
    tls: boolean
    tls_options: FluentDTLS
      
}

interface FluentDSecurity {
    clientHostName: string
    sharedKey: string
    username: string
    password: string
}

interface FluentDTLS{
    ca: string
    cert: string
    key: string
    passphrase: string
}