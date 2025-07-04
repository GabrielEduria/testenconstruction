export default function BlogPage ({ params } :{
    params: { id: string }
}) {
    return 
        <h1 className="pt-50">ID: {params.id}</h1>
    
}