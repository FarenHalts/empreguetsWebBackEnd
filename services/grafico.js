const graficoDB = require('../repositorie/grafico')

module.exports = {
    getGraficService: async (req, res) => {
        let graficoPendente = {
            id: req,
            status: 'pendente'
        }
        let graficoReportados = {
            id: req,
            status: 'reportado'
        }
        let graficoCompletados = {
            id: req,
            status: 'concluido'
        }
        const pending = await graficoDB.getPending(graficoPendente)
        const reports = await graficoDB.getReports(graficoReportados)
        const completed = await graficoDB.getCompleted(graficoCompletados)
        const obj = {
            pending: pending,
            reports: reports,
            completed: completed
            
        }
        return obj
    },
}