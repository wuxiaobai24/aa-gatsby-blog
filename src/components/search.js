import React, { useState } from "react"
import Icon from './icon'

export default () => {
	const [query, setQuery] = useState("");
	return (
		<form
			onSubmit={
				(e) => {
					e.preventDefault();
					if (query) {
						window.open(`https://www.google.com/search?q=${encodeURI(query)}`)
					}
				}
			}
		>
			<div className="field has-addons">
				<div className="control has-icons-left is-expanded">
					<input type="text" className="input is-hovered" placeholder="Search Anything"
						onChange={e => setQuery(`site:https://codeand.fun/posts ${e.target.value}`)}
					/>
					<Icon icon="fa fa-search" iconClassName={"is-small is-left"} />
				</div>
			</div>
		</form>
	)
}