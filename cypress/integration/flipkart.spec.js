///<reference types="cypress"/>
describe('sc01-flipkart interview Task',()=>{
    let testData;
    before(()=>{
        cy.clearCookies()
        cy.fixture('flipkart').then((data)=>{
            testData=data;
        })
    })
    after(()=>{
        cy.clearCookies()
    })
    it('Tc01-flipkart interview task',()=>{
        cy.visit('/')
        cy.get('._3704LK').type(testData.search_text)
        cy.wait(4000)
        cy.get('.lrtEPN').each((el)=>{
            if(el.text().trim().includes(testData.dropdown_select)){
                cy.wrap(el).click({force:true})
                return false
            }
        })
        cy.get('a.s1Q9rs').each((el)=>{
            if(el.text().trim().includes(testData.book_name)){
                cy.wrap(el).invoke('removeAttr','target').click({force:true})
                return false
            }
        })
        cy.get('._16Jk6d').invoke('text').then((txt)=>{testData.itemprice=txt})
        cy.get('._2iDkf8').each((el,index)=>{
            if(index!=0){
                cy.wrap(el).click({force:true}).should('not.be.checked')
            }
        })
        cy.get('._1UcWw6 > ._2KpZ6l').first().scrollIntoView().click({force:true})
        cy.wait(3000)
        cy.get('._2nQDXZ',{timeout:20000}).each((el)=>{
            if(!el.text().trim().includes(testData.book_name)){
                cy.wrap(el).parent().find('._3dsJAO').eq(1).click()
                cy.get('.FhkMJZ').click()
            }
        })
        cy.wait(4000)
        cy.get('._2nQDXZ',{timeout:20000}).invoke('text').then((txt)=>{
            expect(txt).to.includes(testData.book_name)
        })
        cy.get('._1WpvJ7').invoke('text').then((txt)=>{
            expect(txt).to.includes(testData.itemprice)
        })
    })
})