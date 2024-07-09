export class CalcCard{

    cardElement(){
        cy.get('div[@jsname="jhotKB"]')
    }

    calcAnswer(){
        cy.get('span[contains(@sytle,"right")]')
    }

    calcEquation(){
        cy.get('span[@id="cwos"]')
    }

    calcCE(){
        cy.get('div[(not(contains(@style," none"))) and (@aria-label="clear entry")]')
    }

    calcAC(){
        cy.get('div[(not(contains(@style," none"))) and (@aria-label="all clear")]')
    }

    calcNum_btn_0(){
        cy.get('div[@class="card-section"]//tr/td//div[.="0"]')
    }

    calcNum_btn_1(){
        cy.get('div[@class="card-section"]//tr/td//div[.="1"]')
    }

    calcNum_btn_2(){
        cy.get('div[@class="card-section"]//tr/td//div[.="2"]')
    }

    calcNum_btn_3(){
        cy.get('div[@class="card-section"]//tr/td//div[.="3"]')
    }

    calcNum_btn_4(){
        cy.get('div[@class="card-section"]//tr/td//div[.="4"]')
    }

    calcNum_btn_5(){
        cy.get('div[@class="card-section"]//tr/td//div[.="5"]')
    }

    calcNum_btn_6(){
        cy.get('div[@class="card-section"]//tr/td//div[.="6"]')
    }

    calcNum_btn_7(){
        cy.get('div[@class="card-section"]//tr/td//div[.="7"]')
    }

    calcNum_btn_8(){
        cy.get('div[@class="card-section"]//tr/td//div[.="8"]')
    }

    calcNum_btn_9(){
        cy.get('div[@class="card-section"]//tr/td//div[.="9"]')
    }

}