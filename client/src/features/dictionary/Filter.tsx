import translate from 'counterpart';
import { InputBase } from "@material-ui/core"

const styles = {
  filter: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginRight: '40px',
  },
  filterTitle: {
    height: '14px',
    color: '#595959',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '14px',
  },
  filterInput: {
    height: '30px',
    width: '200px',
    border: '1px solid #cccccc',
    borderRadius: '18px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: '10px',
  }
};

type FilterProps = {
  filter: string,
  setFilter: (s : string) => void,
  horizontal?: any,
  label?: string
}

export const Filter = ({ 
  filter,
  setFilter,
  horizontal='flex-end',
  label=translate('dictionaryPage.filter')
}: FilterProps) => {
  return (
    <div style={{...styles.filter, justifyContent: horizontal}}>
      <p style={styles.filterTitle}>{label}</p>
      <InputBase
        style={styles.filterInput}
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  )
}
