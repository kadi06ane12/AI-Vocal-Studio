import "./Queue.css";

function Queue({jobs}){

return(

<div className="jobs-card">

<h2>📋 Processing Queue</h2>

{jobs.map((job,index)=>(

<div
className="job"
key={index}
>

<span>{job.name}</span>

<span>{job.status}</span>

</div>

))}

</div>

);

}

export default Queue;