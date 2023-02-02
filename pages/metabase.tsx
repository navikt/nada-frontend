const Metabase = () => {
    return (
        <iframe
            src="https://metabase.dev.intern.nav.no/public/dashboard/fd4fc319-7ac3-4eca-9957-b1751da590f9"
            style={{height:"200px",width:"100%",overflow:"hidden"}}
            onLoad={() => (function(o: any){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this))}
        />
    )
}

export default Metabase