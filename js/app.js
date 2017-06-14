require("bootstrap/dist/css/bootstrap.css");
import React from 'react';
import {render} from 'react-dom';
import GridComponent from './grid';
import UserDetailsComponent from '../user-details';
import {SummaryActive, SummaryUsers} from './summaries';


render(
    <UserDetailsComponent />,
    document.getElementById('app')
);

/*
render(
    {<GridComponent>}
{<SummaryUsers/>}
{</GridComponent>,}
    document.getElementById('app')
);
    */