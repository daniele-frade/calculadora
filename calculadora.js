// Calculadora em Javascript //

/* 
Baseados em dados de análise de anúncios anteriores, a agência tem os seguintes dados:

- a cada 100 pessoas que visualizam o anúncio 12 clicam nele.
- a cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.
- cada compartilhamento nas redes sociais gera 40 novas visualizações.
- 30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
- o mesmo anúncio é compartilhado no máximo 4 vezes em sequência
(1ª pessoa -> compartilha -> 2ª pessoa -> compartilha - > 3ª pessoa -> compartilha -> 4ª pessoa)

Crie um script em sua linguagem de programação preferida que receba o valor investido em reais e 
retorne uma projeção aproximada da quantidade máxima de pessoas que visualizarão o mesmo anúncio 
(considerando o anúncio original + os compartilhamentos)
*/

/*
    The method below expects a positive value to be passed in as a parameter
    which would be the amount of Reais to be invested for the advertisement.
    Examples:   getMaxEstimatedViews(20)    
                getMaxEstimatedViews(2.6)
*/

function getMaxEstimatedViews(investment) {
    const clickPercentage = 12/100
    const sharingPercentage = 3/20
    const newViewsFromSharing = 40
    const viewsPerReal = 30
    const maxSharingCycles = 4

    // Make sure that the investment is positive and larger than 0
    if (investment <= 0) {
        console.log("Esta função só aceita valores positivos.")
        return 0
    }

    // A list of variables to be used in the loop below
    let totalViews = 0
    let newViews = 0
    let clickingPeople = 0
    let newShares = 0
    let newViewsFromShares = 0
    let cycle = 1

    while (cycle <= maxSharingCycles) {

        // For first cycle newViews is the original views from the investment
        if (cycle == 1) {
            newViews = investment * viewsPerReal
            // Also let's add the original views to the totalViews
            totalViews += newViews
        } else {
            // Otherwise everything below should be recalculated based on the new views from social shares
            newViews = newViewsFromShares
        }

        // Use Math.floor() to make sure we get whole people
        clickingPeople = Math.floor(newViews * clickPercentage)

        // New shares based on the number of people that click the ad
        newShares = Math.floor(clickingPeople * sharingPercentage)

        // New views resulting from shares in social media
        newViewsFromShares = newShares * newViewsFromSharing

        // If there are no new views from share, we might as well stop the looping
        if (newViewsFromShares == 0) {
            break;
        }

        // Add the new views that resulted from shares
        totalViews += newViewsFromShares

        // Move on to the next sharing cycle
        cycle += 1
    }

    // Once done, return the final count of total views
    return totalViews
}

// Example 1 - investing R$1,00 results 30 max views
let investment = 1
totalViews1 = getMaxEstimatedViews(investment)
console.log(`Você investiu R$ ${investment.toFixed(2)} e terá aproximadamente um total de ${Number.parseInt(totalViews1)} visualizações.`)

// Example 2 - investing R$5,00 results 755 max views
investment = 10.25
totalViews2 = getMaxEstimatedViews(investment)
console.log(`Você investiu R$ ${investment.toFixed(2)} e terá aproximadamente um total de ${Number.parseInt(totalViews2)} visualizações.`)

// Example 3 - investing R$10,50 results 755 max views
investment = 30
totalViews3 = getMaxEstimatedViews(investment)
console.log(`Você investiu R$ ${investment.toFixed(2)} e terá aproximadamente um total de ${Number.parseInt(totalViews3)} visualizações.`)