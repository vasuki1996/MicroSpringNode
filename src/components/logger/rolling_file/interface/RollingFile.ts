export interface RollingFile {
    path: string
    limits: RollingFileLimits
      
}

interface RollingFileLimits{
    size: string
    time: string
}