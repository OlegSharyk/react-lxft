import { combineReducers} from 'redux';

let gridRecords = [
        {firstName: "John", lastName: "Doe", active: false, id: 1},
        {firstName: "Mary", lastName: "Moe", active: false, id: 2},
        {firstName: "Peter", lastName: "Noname", active: true, id: 3}
    ],
    detailsRecords = [{
        id:1,
        name:"John Doe",
        about:"Nice guy",
        hobby:"Likes drinking wine",
        skills:["html", "javascript", "redux"]
    },{
        id:2,
        name:"Mary Moe",
        about:"Cute girl",
        hobby:"Likes playing xbox whole days long",
        skills:["Fortran", "Lua", "R#"]
    }];



export function grid(state = gridRecords, action){
    switch (action.type) {
        case "TOGGLE_ACTIVE":
            let newState = [...state];
            newState[action.value].active = !newState[action.value].active;
            return newState;
        case "FILTER":
            return gridRecords.filter((record)=>{
                return record.firstName.toUpperCase().includes(action.value.toUpperCase());
            });
        default:
            return state
    }
}


export function details(state = detailsRecords, action){
    switch (action.type) {
        case "FILTER":
//I also do something on filter action
            return state;
        default:
            return state
    }
}


export const rootReducer = combineReducers({
    details,
    grid
});
