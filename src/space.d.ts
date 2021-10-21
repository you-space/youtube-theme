declare module 'space' {
  interface Space {
    emit<T = any>(event: string, data?: any): Promise<T>
  }

  const space: Space

  export default space
}
